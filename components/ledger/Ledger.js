import React from "react";
import SideBar from "../SideBar";
import Data from "./Data";

function Ledger({ session }) {
  return (
    <div className="screenContainer">
      <SideBar />
      <Data session={session} />
    </div>
  );
}

export default Ledger;
