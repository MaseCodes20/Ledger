import React from "react";
import SideBar from "./SideBar";

function Ledger() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <h1 className="text-center">Ledger</h1>
      </div>
    </div>
  );
}

export default Ledger;
