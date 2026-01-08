import { Outlet } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import TopBar from "../layout/TopBar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAF7EC] via-[#F4F8FF] to-[#EAF7EC]">
      
      {/* SIDEBAR */}
      <aside className="fixed left-0 top-0 h-screen w-64">
        <Sidebar />
      </aside>

      {/* MAIN AREA */}
      <div className="ml-64 flex min-h-screen flex-col">
        <TopBar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
