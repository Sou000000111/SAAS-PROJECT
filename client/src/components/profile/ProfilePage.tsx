import { Camera, Mail, Phone, MapPin, ShieldCheck, Edit } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      {/* HEADER CARD */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg">
        {/* Cover */}
        <div className="h-40 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500" />

        {/* Avatar */}
        <div className="absolute left-6 -bottom-12 flex items-end gap-4">
          <div className="relative">
            <img
              src="/admin.jpg"
              alt="Admin"
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow"
            />
            <button className="absolute bottom-1 right-1 bg-white p-1.5 rounded-full shadow hover:bg-slate-100">
              <Camera className="w-4 h-4 text-slate-600" />
            </button>
          </div>
          <div className="pb-6">
            <h2 className="text-2xl font-bold text-slate-900">Soumyajit Sinha</h2>
            <p className="text-sm text-slate-600">Administrator • SaaSBoard</p>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute right-6 bottom-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-700 shadow hover:bg-slate-100">
            <Edit className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        {/* Spacer */}
        <div className="h-16 bg-white" />
      </div>

      {/* CONTENT */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: INFO */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                soumyajit@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" />
                +91 9XXXXXXXXX
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-500" />
                Kolkata, India
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-4">Role & Security</h3>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-indigo-600" />
              <div>
                <p className="font-medium">Admin Access</p>
                <p className="text-xs text-slate-500">Full system privileges</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: DETAILS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-4">About</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Experienced administrator managing analytics, users, and business
              insights for SaaSBoard. Focused on performance monitoring, growth
              optimization, and system reliability.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow">
            <h3 className="font-semibold mb-4">Account Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-xs text-slate-500">Logins</p>
                <p className="text-xl font-bold">128</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-xs text-slate-500">Reports</p>
                <p className="text-xl font-bold">54</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-xs text-slate-500">Exports</p>
                <p className="text-xl font-bold">21</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4 text-center">
                <p className="text-xs text-slate-500">Active Since</p>
                <p className="text-xl font-bold">2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
