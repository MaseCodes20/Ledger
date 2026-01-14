import { Session } from "next-auth";
import Footer from "../Footer";
import MobileMenu from "../MobileMenu";
import SideBar from "../SideBar";
import Data from "./Data";

type LedgerProps = {
  session: Session
}

function Ledger({ session }: LedgerProps) {
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
