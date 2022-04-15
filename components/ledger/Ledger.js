import React from "react";
import MobileMenu from "../MobileMenu";
import SideBar from "../SideBar";
import Data from "./Data";

function Ledger({ session }) {
  return (
    <div className="screenContainer">
      <MobileMenu session={session} />
      <SideBar />
      <Data session={session} />
    </div>
  );
}

export default Ledger;
