import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function useFetchData(session) {
  const [incomes, setIncomes] = useState([]);
  const [bills, setBills] = useState([]);
  const [goals, setGoals] = useState([]);
  const [investments, setInvestments] = useState();
  const [loadingIncomes, setLoadingIncomes] = useState(true);
  const [loadingExpense, setLoadingExpense] = useState(true);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [loadingInvestments, setLoadingInvestments] = useState(true);

  useEffect(() => {
    let mounted = true;

    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "incomes"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        if (mounted) {
          setIncomes(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          setLoadingIncomes(false);
        }
      }
    );

    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "expense"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        if (mounted) {
          setBills(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          setLoadingExpense(false);
        }
      }
    );

    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "goals"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        if (mounted) {
          setGoals(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
          setLoadingGoals(false);
        }
      }
    );

    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "investments"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        if (mounted) {
          setInvestments(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          );
          setLoadingInvestments(false);
        }
      }
    );

    return () => {
      mounted = false;
    };
  }, [db, session, session.user.uid, session.user.email]);

  return {
    incomes,
    bills,
    goals,
    investments,
    loadingIncomes,
    loadingExpense,
    loadingGoals,
    loadingInvestments,
  };
}

export default useFetchData;
