import { useState } from "react";
import { Check } from "lucide-react";

/* ================= RAZORPAY TYPES ================= */
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
};

/* ================= PLAN TYPES ================= */
type Plan = {
  id: string;
  name: string;
  priceMonthly: number;
  priceYearly: number;
  users: number;
  popular?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    priceMonthly: 399,
    priceYearly: 3999,
    users: 340,
    features: ["Dashboard Access", "Basic Analytics", "Email Support"],
  },
  {
    id: "pro",
    name: "Pro",
    priceMonthly: 999,
    priceYearly: 9999,
    users: 120,
    popular: true,
    features: [
      "Everything in Basic",
      "Advanced Analytics",
      "Priority Support",
      "Export Reports",
    ],
  },
];

export default function Products() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [loading, setLoading] = useState(false);

  /* ================= PAYMENT HANDLER ================= */
  const handlePayment = async (plan: Plan) => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      setLoading(true);

      const amount =
        billing === "monthly" ? plan.priceMonthly : plan.priceYearly;

      const res = await fetch(
        "http://localhost:5000/api/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount }),
        }
      );

      const order = await res.json();

      if (!res.ok) {
        throw new Error(order.message || "Order creation failed");
      }

      const options: RazorpayOptions = {
        key: "rzp_test_S0UJoHHJOByuIk",
        amount: order.amount,
        currency: "INR",
        name: "SaaSBoard",
        description: `${plan.name} Plan`,
        order_id: order.id,

        handler: (response: RazorpayResponse) => {
          alert("✅ Payment Successful (TEST MODE)");
          console.log(response);
        },

        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#4f46e5",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors space-y-8">

      {/* ===== HEADER ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Pricing Plans</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Choose a plan that fits your business
          </p>
        </div>

        {/* BILLING TOGGLE */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              billing === "monthly"
                ? "bg-indigo-600 text-white"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={`px-4 py-2 rounded-lg text-sm transition ${
              billing === "yearly"
                ? "bg-indigo-600 text-white"
                : "text-slate-600 dark:text-slate-300"
            }`}
          >
            Yearly <span className="text-xs">(Save 15%)</span>
          </button>
        </div>
      </div>

      {/* ===== PLANS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl border 
              bg-white dark:bg-slate-800
              border-slate-200 dark:border-slate-700
              p-8 shadow-sm hover:shadow-xl transition
              ${plan.popular ? "ring-2 ring-indigo-500 scale-[1.02]" : ""}
            `}
          >
            {plan.popular && (
              <span className="absolute top-4 right-4 text-xs font-semibold bg-indigo-600 text-white px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <h3 className="text-xl font-semibold mb-1">{plan.name} Plan</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Up to {plan.users} users
            </p>

            <div className="mb-6">
              <span className="text-4xl font-bold">
                ₹
                {billing === "monthly"
                  ? plan.priceMonthly
                  : plan.priceYearly}
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-sm ml-2">
                /{billing === "monthly" ? "month" : "year"}
              </span>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
                >
                  <Check className="h-4 w-4 text-green-600" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              disabled={loading}
              onClick={() => handlePayment(plan)}
              className={`w-full py-3 rounded-xl font-medium transition ${
                plan.popular
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700"
              } ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? "Processing..." : "Get Started"}
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-slate-400 dark:text-slate-500">
        Payments powered by Razorpay (TEST / Demo mode)
      </p>
    </div>
  );
}
