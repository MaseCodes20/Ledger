import React from "react";
import Footer from "../Footer";
import MobileMenu from "../MobileMenu";
import SideBar from "../SideBar";
import Data from "./Data";

function Ledger({ session }) {
  return (
    <div className="screenContainer">
      <MobileMenu session={session} />
      <SideBar />
      <Data session={session} />

      <div className="lg:hidden mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Ledger;
