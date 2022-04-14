import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import ExpenseForm from "./ExpenseForm";

function Expense({ session }) {
  const [bills, setBills] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "expense"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        setBills(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div className="flex-1">
      <h1 className="text-center">Expense</h1>
      <ExpenseForm session={session} />

      {bills !== [] && (
        <>
          <div className="grid grid-cols-4 gap-1 justify-items-center">
            {bills?.map((bill) => {
              const { userID, company, fee: debt } = bill.data();
              return (
                <div
                  key={`${userID}${company}`}
                  className="bg-blue-400 my-2 w-[200px] h-[100px] rounded-md"
                >
                  <div className="flex">
                    <p className="mr-2">Company:</p>
                    <p>{company}</p>
                  </div>

                  <div className="flex">
                    <p className="mr-2">Debt:</p>
                    <p>{debt}</p>
                  </div>
                </div>
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
