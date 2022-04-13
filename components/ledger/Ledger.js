import React from "react";
import SideBar from "../SideBar";
import Data from "./Data";

function Ledger() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <Data />
    </div>
  );
}

export default Ledger;
