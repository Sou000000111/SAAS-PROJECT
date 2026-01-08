import { useState } from "react";
import UsersTable from "../tables/UsersTable";

export default function UsersSection() {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="bg-white 
                  dark:bg-slate-800 
  text-slate-800 
  dark:text-slate-100 
  rounded-xl 
  shadow
  p-6">
      <div className="flex justify-between items-center p-4 rounded-lg
    transition
    hover:bg-slate-100
    dark:hover:bg-slate-800/60">
        <h3 className="text-lg font-semibold">Users</h3>

        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="text-sm text-blue-600 font-medium hover:underline"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      {/* 👇 yahin se control ja raha hai */}
      <UsersTable showAll={showAll} />
    </div>
  );
}
