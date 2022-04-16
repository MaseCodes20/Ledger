import Head from "next/head";
import React from "react";
import useFetchSession from "../../hooks/useFetchSession";
import LoadingScreen from "../LoadingScreen";
import MobileMenu from "../MobileMenu";
import SideBar from "../SideBar";
import Expense from "./Expense";

export default function ExpensePage() {
  const { session, status } = useFetchSession();

  return (
    <>
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
              <MobileMenu session={session} />
              <SideBar />
              <Expense session={session} />
            </div>
          )}
        </>
      )}
    </>
  );
}