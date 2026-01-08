import { useEffect, useMemo, useState } from "react";
import jsPDF from "jspdf";

type Order = {
  id: string;
  customer: string;
  amount: number;
  status: "Paid" | "Pending";
  createdAt: string;
};

type StatusFilter = "All" | "Paid" | "Pending";
type SortBy = "date" | "amount";

const ORDERS: Order[] = [
  { id: "#ORD-101", customer: "Soumyajit", amount: 2400, status: "Paid", createdAt: "2024-01-10" },
  { id: "#ORD-102", customer: "Rahul", amount: 1200, status: "Pending", createdAt: "2024-01-12" },
  { id: "#ORD-103", customer: "Ankit", amount: 3600, status: "Paid", createdAt: "2024-01-14" },
  { id: "#ORD-104", customer: "Sourav", amount: 1800, status: "Pending", createdAt: "2024-01-15" },
  { id: "#ORD-105", customer: "Aman", amount: 5200, status: "Paid", createdAt: "2024-01-18" },
];

const PAGE_SIZE = 3;

export default function Orders() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.toLowerCase()), 400);
    return () => clearTimeout(t);
  }, [search]);

  const processedOrders = useMemo(() => {
    let data = [...ORDERS];

    data = data.filter(
      (o) =>
        o.id.toLowerCase().includes(debouncedSearch) ||
        o.customer.toLowerCase().includes(debouncedSearch)
    );

    if (status !== "All") data = data.filter((o) => o.status === status);

         if (sortBy === "amount") {
           data.sort((a, b) => b.amount - a.amount);
           } else {
            data.sort(
              (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
            );
           }

    return data;
  }, [debouncedSearch, status, sortBy]);

  const totalPages = Math.ceil(processedOrders.length / PAGE_SIZE);
  const paginatedOrders = processedOrders.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const exportCSV = () => {
    const rows = [
      ["Order ID", "Customer", "Amount", "Status", "Date"],
      ...processedOrders.map((o) => [
        o.id,
        o.customer,
        o.amount,
        o.status,
        o.createdAt,
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadInvoice = (order: Order) => {
    const pdf = new jsPDF();
    pdf.text("INVOICE", 20, 20);
    pdf.text(`Order ID: ${order.id}`, 20, 40);
    pdf.text(`Customer: ${order.customer}`, 20, 50);
    pdf.text(`Amount: ₹${order.amount}`, 20, 60);
    pdf.text(`Status: ${order.status}`, 20, 70);
    pdf.text(`Date: ${order.createdAt}`, 20, 80);
    pdf.save(`invoice-${order.id}.pdf`);
  };

  return (
    <div className="p-6 space-y-6 bg-transparent text-slate-900 dark:text-slate-100">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Recent transactions
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700"
        >
          Export CSV
        </button>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-4">
        <input
          placeholder="Search order ID or customer..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 rounded-xl border
          bg-white dark:bg-slate-800
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-700 text-sm"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          className="px-4 py-2 rounded-xl border
          bg-white dark:bg-slate-800
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-700 text-sm"
        >
          <option>All</option>
          <option>Paid</option>
          <option>Pending</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="px-4 py-2 rounded-xl border
          bg-white dark:bg-slate-800
          text-slate-800 dark:text-slate-100
          border-slate-300 dark:border-slate-700 text-sm"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="rounded-2xl border shadow-sm overflow-hidden
        bg-white dark:bg-slate-800
        border-slate-200 dark:border-slate-700">

        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900">
            <tr className="text-slate-600 dark:text-slate-300">
              <th className="px-6 py-4 text-left">Order ID</th>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {paginatedOrders.map((o) => (
              <tr
                key={o.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-700/40"
              >
                <td className="px-6 py-4 font-medium">{o.id}</td>
                <td className="px-6 py-4">{o.customer}</td>
                <td className="px-6 py-4">₹{o.amount}</td>
                <td className="px-6 py-4">{o.createdAt}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      o.status === "Paid"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {o.status}
                  </span>

                  <button
                    onClick={() => downloadInvoice(o)}
                    className="text-indigo-600 dark:text-indigo-400 hover:underline text-xs"
                  >
                    Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-end gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-lg text-sm ${
                page === i + 1
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
