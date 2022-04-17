import React from "react";

function WelcomeUser({ session }) {
  return (
    <div className="h-screen text-center">
      <div className="welcomeUserCenteredSmallScreens lg:centeredOnScreen">
        <h1 className="text-3xl text-[#F26BDC]">Hello {session.user.name},</h1>
        <h1 className="text-2xl mb-4 text-[#F26BDC]">welcome to Legder</h1>
        <div className="w-[250px] mx-auto">
          <p className="mb-2 pb-2 border-b-2 border-[#8985F2]">
            On this page is where you will see the data visualization of your
            expense, income and goals!
          </p>
          <p>Use the Navigation on the left to get started.</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeUser;
