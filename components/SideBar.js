import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function SideBar() {
  const { data: session } = useSession();

  const router = useRouter();

  const { image, name } = session.user;
  return (
    <div className="w-[300px] h-screen bg-black text-white border-r-2 border-gray-500">
      <div className="flex items-center p-4 border-b-2 border-gray-500">
        <img
          src={image}
          alt="profile pic"
          className="rounded-full h-12 cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="ml-3">
          <h1 className="text-xl">{name}</h1>
          <button onClick={signOut}>sign out</button>
        </div>
      </div>

      {/* Pages */}
      <div className="flex flex-col">
        <button onClick={() => router.push("/")} className="sideBarButtons">
          Home
        </button>
        <button
          onClick={() => router.push("/income")}
          className="sideBarButtons"
        >
          Income
        </button>
        <button
          onClick={() => router.push("/expense")}
          className="sideBarButtons"
        >
          Expense
        </button>
        <button
          onClick={() => router.push("/goals")}
          className="sideBarButtons"
        >
          Goals
        </button>
      </div>
    </div>
  );
}

export default SideBar;
