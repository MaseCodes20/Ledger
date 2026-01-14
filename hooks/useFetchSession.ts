"use client"

import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession, UseSessionOptions } from "next-auth/react";
import { useEffect } from "react";
import { db } from "../firebase";

type useFetchSessionProps = {
  options?: UseSessionOptions<boolean>
}

function useFetchSession({options}: useFetchSessionProps) {
  const { data: session } = useSession();
  const { status } = useSession(options);

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
  }, [session, db]);

  return { session, status };
}

export default useFetchSession;
