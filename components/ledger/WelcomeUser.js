import React from "react";
import { ChevronDoubleDownIcon } from "@heroicons/react/solid";

function WelcomeUser({ session, goals }) {
  return (
    <div className="h-screen text-center">
      <div className="welcomeUserCenteredSmallScreens lg:centeredOnScreen">
        <h1 className="text-3xl text-[#F26BDC]">Hello {session.user.name},</h1>
        <h1 className="text-2xl mb-4 text-[#F26BDC]">welcome to Legder!</h1>
        <div className="w-[250px] mx-auto">
          <p className="mb-2 pb-2 border-b-2 border-[#8985F2]">
            On this page is where you will see the data visualization of your
            expense, income and goals!
          </p>
          <p className="hidden lg:flex">
            Use the Navigation on the left to get started.
          </p>
          <p className="lg:hidden">Use the menu at the top to get started.</p>
        </div>
        {goals.length > 0 && (
          <>
            <h1 className="text-[#F26BDC]  mt-10 mb-2">Scroll to see goals</h1>
            <ChevronDoubleDownIcon className="h-10 mx-auto animate-bounce text-[#F26BDC]" />
          </>
        )}
      </div>
    </div>
  );
}

export default WelcomeUser;
