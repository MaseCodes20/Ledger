import { useRef } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function IncomeForm({ session }) {
  const jobInputRef = useRef();
  const incomeRef = useRef();

  const submitIncome = async (e) => {
    e.preventDefault();
    if (jobInputRef.current.value === "" || incomeRef.current.value === "")
      return;

    const docRef = await addDoc(
      collection(db, "users", session.user.uid, "incomes"),
      {
        employee: session.user.name,
        job: jobInputRef.current.value,
        income: parseInt(incomeRef.current.value),
        userID: session.user.uid,
        email: session.user.email,
        timestamp: serverTimestamp(),
      }
    );

    jobInputRef.current.value = "";
    incomeRef.current.value = "";
  };
  return (
    <div className="bg-blue-400 w-fit mx-auto text-center rounded-lg p-2">
      <h1 className="text-center font-semibold">Add your monthly income</h1>
      <form onSubmit={submitIncome}>
        <div className="flex my-2">
          <p className="mr-2">Job:</p>
          <input
            type="text"
            ref={jobInputRef}
            placeholder="name...."
            className="w-full"
          />
        </div>

        <div className="flex my-2">
          <p className="mr-2">Net income:</p>
          <input
            type="number"
            ref={incomeRef}
            placeholder="amount...."
            className=""
          />
        </div>

        <input
          type="submit"
          className="cursor-pointer rounded-full bg-white p-1 mt-2"
        />
      </form>
    </div>
  );
}

export default IncomeForm;
