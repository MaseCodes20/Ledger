import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import ExpenseForm from "./ExpenseForm";

function Expense({ session }) {
  const [bills, setBills] = useState([]);
  const [selected, setSelected] = useState(null);

  const companyInputRef = useRef();
  const feeRef = useRef();

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

  const updateExpense = async (e, id) => {
    e.preventDefault();
    if (companyInputRef.current.value === "" || feeRef.current.value === "")
      return;
    const documentRef = doc(db, "users", session.user.uid, "expense", id);

    await updateDoc(documentRef, {
      company: companyInputRef.current.value,
      fee: parseInt(feeRef.current.value),
    });

    setSelected(null);
  };

  return (
    <div className="rightSideContainer">
      <h1 className="text-center">Expense</h1>
      <ExpenseForm session={session} />

      {bills !== [] && (
        <>
          <div className="grid grid-cols-4 gap-1 justify-items-center">
            {bills?.map((bill) => {
              const { company, fee: debt, id } = bill;
              return (
                <div
                  key={id}
                  className="bg-blue-400 p-2 my-2 w-[200px] h-fit rounded-md"
                >
                  <button onClick={() => setSelected(id)}>update</button>
                  <div className="flex">
                    <p className="mr-2">Company:</p>
                    <p>{company}</p>
                  </div>

                  <div className="flex">
                    <p className="mr-2">Debt:</p>
                    <p>{debt}</p>
                  </div>

                  {selected === id && (
                    <div className="text-center">
                      <form onSubmit={(e) => updateExpense(e, id)}>
                        <div className="flex my-2">
                          <p className="mr-2">company:</p>
                          <input
                            type="text"
                            ref={companyInputRef}
                            placeholder="name...."
                            className="w-full text-black"
                          />
                        </div>

                        <div className="flex my-2">
                          <p className="mr-2">fee:</p>
                          <input
                            type="number"
                            ref={feeRef}
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

          {/* <p>{sumIncome(getSalary)}</p> */}
        </>
      )}
    </div>
  );
}

export default Expense;
