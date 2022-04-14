import { useEffect, useState } from "react";
import IncomeForm from "./IncomeForm";
import { db } from "../../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

function Income({ session }) {
  const [incomes, setIncomes] = useState([]);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "incomes"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        setIncomes(snapshot.docs);
      }
    );
  }, [db]);

  const sumIncome = (income) => {
    return income.reduce((a, b) => a + b, 0);
  };

  const getSalary = incomes.map((income) => income.data().income);
  return (
    <div className="flex-1">
      <h1 className="text-center">Income</h1>
      <IncomeForm session={session} />

      {incomes !== [] && (
        <>
          <div className="grid grid-cols-4 gap-1 justify-items-center">
            {incomes?.map((income) => {
              const { userID, job, income: salary } = income.data();
              return (
                <div
                  key={`${userID}${job}`}
                  className="bg-blue-400 my-2 w-[200px] h-[100px] rounded-md"
                >
                  <div className="flex">
                    <p className="mr-2">Job:</p>
                    <p>{job}</p>
                  </div>

                  <div className="flex">
                    <p className="mr-2">Salary:</p>
                    <p>{salary}</p>
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

export default Income;
