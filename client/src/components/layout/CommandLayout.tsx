import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";


export default function CommandLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#0B0F1A]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
