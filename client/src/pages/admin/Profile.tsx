import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileInfo from "../../components/profile/ProfileInfo";
import AccountStats from "../../components/profile/AccountStats";
import ActivityTimeline from "../../components/profile/ActivityTimeline";

export default function Profile() {
  return (
    <div className="
      p-6 min-h-screen
      bg-white dark:bg-slate-900
      text-slate-800 dark:text-slate-100
      transition-colors space-y-6
    ">
      {/* ================= HEADER ================= */}
      <ProfileHeader />

      {/* ================= BODY ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          rounded-2xl
        ">
          <ProfileInfo />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            rounded-2xl
          ">
            <AccountStats />
          </div>

          <div className="
            bg-white dark:bg-slate-800
            border border-slate-200 dark:border-slate-700
            rounded-2xl
          ">
            <ActivityTimeline />
          </div>
        </div>
      </div>
    </div>
  );
}
