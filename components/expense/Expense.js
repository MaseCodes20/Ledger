import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import ExpenseAndIncomeCard from "../ExpenseAndIncomeCard";
import Form from "../Form";

function Expense({ session }) {
  const [bills, setBills] = useState([]);

  const cardTitle = "Bill";
  const pageTitle = "expense";
  const nameInputTitle = "expense";
  const moneyInputTitle = "fee";

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "expense"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        setBills(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );
  }, [db]);

  return (
    <div className="rightSideContainer">
      <h1 className="text-center">Expense</h1>
      <Form
        session={session}
        pageTitle={pageTitle}
        nameInputTitle={nameInputTitle}
        moneyInputTitle={moneyInputTitle}
      />

      {bills && (
        <>
          <div className="grid grid-cols-4 gap-1 justify-items-center">
            {bills?.map((bill) => {
              const { expense, fee: debt, id } = bill;
              return (
                <ExpenseAndIncomeCard
                  key={id}
                  id={id}
                  session={session}
                  pageTitle={pageTitle}
                  money={debt}
                  name={expense}
                  nameInputTitle={nameInputTitle}
                  moneyInputTitle={moneyInputTitle}
                  cardTitle={cardTitle}
                />
              );
            })}
          </div>

          {/* <p>{sumIncome(getSalary)}</p> */}
        </>
      )}
    </div>
  );
}

export default Expense;
