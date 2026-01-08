export default function ChangePasswordModal() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h3 className="font-semibold mb-4">Change Password</h3>
      <input type="password" placeholder="Current Password" className="input" />
      <input type="password" placeholder="New Password" className="input mt-2" />
      <button className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg">
        Update Password
      </button>
    </div>
  );
}
