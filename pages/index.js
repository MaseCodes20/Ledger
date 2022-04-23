import Head from "next/head";
import Ledger from "../components/ledger/Ledger";
import LoadingScreen from "../components/LoadingScreen";
import WelcomeScreen from "../components/WelcomeScreen";
import useFetchSession from "../hooks/useFetchSession";

export default function Home() {
  const loggedIn = { required: false };
  const { session, status } = useFetchSession(loggedIn);

  return (
    <div className="pageContainer">
      <Head>
        <title>LedgerMe</title>
        <meta name="description" content="Generated by Masecodes" />
        <link rel="icon" href="/book_books_study_read_school_icon_209913.ico" />
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
