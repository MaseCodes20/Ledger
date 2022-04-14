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
        setIncomes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );
  }, [db]);

  console.log(incomes);

  // const getSalary = incomes.map((income) => income.data().income);

  const updateIncome = async (e) => {
    const documentRef = doc(db, "users", session.user.uid, "incomes");

    // Set the "capital" field of the city 'DC'
    await updateDoc(documentRef, {
      capital: true,
    });
  };

  return (
    <div className="rightSideContainer">
      <h1 className="text-center">Income</h1>
      <IncomeForm session={session} />

      {incomes && (
        <>
          <div className="grid grid-cols-4 gap-1 justify-items-center">
            {incomes?.map((income) => {
              const { job, income: salary, id } = income;
              return (
                <div
                  key={id}
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
