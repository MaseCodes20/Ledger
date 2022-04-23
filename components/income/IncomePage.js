import Head from "next/head";
import React from "react";
import useFetchSession from "../../hooks/useFetchSession";
import Footer from "../Footer";
import LoadingScreen from "../LoadingScreen";
import MobileMenu from "../MobileMenu";
import SideBar from "../SideBar";
import Income from "./Income";

function IncomePage() {
  const loggedIn = { required: true };
  const { session, status } = useFetchSession(loggedIn);

  return (
    <>
      <Head>
        <title>Income</title>
        <meta name="description" content="Generated by Masecodes" />
        <link rel="icon" href="/book_books_study_read_school_icon_209913.ico" />
      </Head>
      {status === "loading" ? (
        <LoadingScreen />
      ) : (
        <>
          {session && (
            <div className="screenContainer">
              <MobileMenu session={session} />
              <SideBar />
              <Income session={session} />

              <div className="lg:hidden mt-10">
                <Footer />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default IncomePage;
