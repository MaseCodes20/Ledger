import { collection, DocumentData, onSnapshot, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { Session } from "next-auth";
import { Goal, Transaction } from "../types";

function useFetchData(session: Session) {
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [bills, setBills] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [investments, setInvestments] = useState<Transaction[]>([]);
  const [loadingIncomes, setLoadingIncomes] = useState(true);
  const [loadingExpense, setLoadingExpense] = useState(true);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [loadingInvestments, setLoadingInvestments] = useState(true);

  const mapFirestoreDoc = <T extends object>(doc: QueryDocumentSnapshot<DocumentData>): T => {
  return { id: doc.id, ...doc.data() } as T;
};

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
            snapshot.docs.map(mapFirestoreDoc<Transaction>)
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
          setBills(snapshot.docs.map(mapFirestoreDoc<Transaction>));
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
          setGoals(snapshot.docs.map(mapFirestoreDoc<Goal>));
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
            snapshot.docs.map(mapFirestoreDoc<Transaction>)
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
