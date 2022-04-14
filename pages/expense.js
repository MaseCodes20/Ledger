import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import Expense from "../components/expense/Expense";
import LoadingScreen from "../components/LoadingScreen";
import SideBar from "../components/SideBar";
import { db } from "../firebase";

function expense() {
  const { data: session, status } = useSession({ required: true });

  useEffect(() => {
    if (session) {
      setDoc(
        doc(db, "users", session.user.uid),
        {
          email: session.user.email,
          lastSeen: serverTimestamp(),
          photoURL: session.user.image,
          name: session.user.name,
        },
        { merge: true }
      );
    }
  }, [session][db]);

  return (
    <div className="pageContainer">
      <Head>
        <title>Expense</title>
        <meta name="description" content="Generated by Masecodes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {status === "loading" ? (
        <LoadingScreen />
      ) : (
        <>
          {session && (
            <div className="screenContainer">
              <SideBar />
              <Expense session={session} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default expense;
