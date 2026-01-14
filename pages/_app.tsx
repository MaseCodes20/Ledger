"use client"

import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Ensure we don't crash if session is missing or undefined during the initial handshake
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;