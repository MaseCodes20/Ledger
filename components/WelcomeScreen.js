import { signIn } from "next-auth/react";
import React from "react";

function WelcomeScreen() {
  return (
    <div className="centeredOnScreen">
      <div className="rounded-md bg-slate-500 w-[300px] text-center">
        <h1>Welcome To Ledger</h1>
        <button
          onClick={signIn}
          className="bg-blue-500 rounded-full p-3 hover:bg-blue-300"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
