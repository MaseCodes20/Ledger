import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { db } from "../firebase";

function useFetchSession() {
  const { data: session } = useSession();
  const { status } = useSession({ required: true });

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

  return { session, status };
}

export default useFetchSession;
