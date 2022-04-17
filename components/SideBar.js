import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Footer from "./Footer";

function SideBar() {
  const { data: session } = useSession();

  const router = useRouter();

  const { image, name } = session.user;
  return (
    <div className="hidden lg:flex">
      <div className="relative w-[300px] h-screen bg-[#151426] text-white border-r-2 border-[#8985F2]">
        <div className="flex justify-between items-center p-4 border-b-2 border-[#8985F2]">
          <div>
            <h1 className="text-2xl">Ledger</h1>
          </div>
          <img
            src={image}
            alt="profile pic"
            className="rounded-full h-12 cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div className="text-right">
            <h1>{name}</h1>
            <button onClick={signOut} className="text-sm">
              Sign out
            </button>
          </div>
        </div>

        <nav className="flex flex-col mt-10">
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
        </nav>

        <Footer />
      </div>
    </div>
  );
}

export default SideBar;
