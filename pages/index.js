import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import Ledger from "../components/ledger/Ledger";
import LoadingScreen from "../components/LoadingScreen";
import WelcomeScreen from "../components/WelcomeScreen";
import { db } from "../firebase";

export default function Home() {
  const { data: session, status } = useSession();

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
        <title>Create Next App</title>
        <meta name="description" content="Generated by Masecodes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {status === "loading" ? (
          <LoadingScreen />
        ) : (
          <>{!session ? <WelcomeScreen /> : <Ledger session={session} />}</>
        )}
      </>
    </div>
  );
}
