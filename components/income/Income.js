import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import ExpenseAndIncomeCard from "../ExpenseAndIncomeCard";
import Form from "../Form";

function Income({ session }) {
  const [incomes, setIncomes] = useState([]);

  const cardTitle = "Income";
  const incomePageTitle = "incomes";
  const nameInputTitle = "job";
  const moneyInputTitle = "income";

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "incomes"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        setIncomes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );
  }, [db]);

  return (
    <div className="rightSideContainer">
      <Form
        session={session}
        pageTitle={incomePageTitle}
        nameInputTitle={nameInputTitle}
        moneyInputTitle={moneyInputTitle}
      />

      {incomes && (
        <>
          <div className="incomeAndExpenseGrid">
            {incomes?.map((income) => {
              const { job, income: salary, id } = income;
              return (
                <ExpenseAndIncomeCard
                  key={id}
                  id={id}
                  session={session}
                  pageTitle={incomePageTitle}
                  money={salary}
                  name={job}
                  nameInputTitle={nameInputTitle}
                  moneyInputTitle={moneyInputTitle}
                  cardTitle={cardTitle}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Income;
