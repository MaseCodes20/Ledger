import { useEffect, useState, useRef } from "react";
import IncomeForm from "./IncomeForm";
import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";
import UpdateDeleteButtons from "../UpdateDeleteButtons";

function Income({ session }) {
  const [incomes, setIncomes] = useState([]);
  const [selected, setSelected] = useState(null);

  const jobInputRef = useRef();
  const incomeRef = useRef();

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

  const updateIncome = async (e, id) => {
    e.preventDefault();
    if (jobInputRef.current.value === "" || incomeRef.current.value === "")
      return;
    const documentRef = doc(db, "users", session.user.uid, "incomes", id);

    await updateDoc(documentRef, {
      job: jobInputRef.current.value,
      income: parseInt(incomeRef.current.value),
    });

    setSelected(null);
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
                  className="bg-blue-400 p-2 my-2 w-[200px] h-fit rounded-md"
                >
                  <div className="flex">
                    <p className="mr-2">Job:</p>
                    <p>{job}</p>
                  </div>

                  <div className="flex">
                    <p className="mr-2">Salary:</p>
                    <p>{salary}</p>
                  </div>

                  <UpdateDeleteButtons
                    id={id}
                    setSelected={setSelected}
                    session={session}
                  />

                  {selected === id && (
                    <div className="text-center">
                      <form onSubmit={(e) => updateIncome(e, id)}>
                        <div className="flex my-2">
                          <p className="mr-2">Job:</p>
                          <input
                            type="text"
                            ref={jobInputRef}
                            placeholder="name...."
                            className="w-full text-black"
                          />
                        </div>

                        <div className="flex my-2">
                          <p className="mr-2">Net income:</p>
                          <input
                            type="number"
                            ref={incomeRef}
                            placeholder="amount...."
                            className="w-full text-black"
                          />
                        </div>

                        <input
                          type="submit"
                          className="cursor-pointer rounded-full bg-white text-black p-1 mt-2"
                        />
                      </form>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Income;
