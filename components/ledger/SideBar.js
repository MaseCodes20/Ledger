import React from "react";
import { signOut, useSession } from "next-auth/react";

function SideBar() {
  const { data: session } = useSession();

  return (
    <div className="w-[300px] h-screen bg-slate-200">
      <div className="flex justify-between p-4">
        <h1>{session.user.name}</h1>
        <button onClick={signOut}>signOut</button>
      </div>

      <h1>Income</h1>
      <h1>Expense</h1>
    </div>
  );
}

export default SideBar;
