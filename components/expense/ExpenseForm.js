import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";

function ExpenseForm({ session }) {
  const companyInputRef = useRef();
  const feeRef = useRef();

  const submitbill = async (e) => {
    e.preventDefault();
    if (companyInputRef.current.value === "" || feeRef.current.value === "")
      return;

    const docRef = await addDoc(
      collection(db, "users", session.user.uid, "expense"),
      {
        company: companyInputRef.current.value,
        fee: parseInt(feeRef.current.value),
        userID: session.user.uid,
        email: session.user.email,
        timestamp: serverTimestamp(),
      }
    );

    companyInputRef.current.value = "";
    feeRef.current.value = "";
  };
  return (
    <div className="bg-blue-400 w-fit mx-auto text-center rounded-lg p-2">
      <h1 className="text-center font-semibold">Add your monthly bill</h1>
      <form onSubmit={submitbill}>
        <div className="flex my-2">
          <p className="mr-2">Company:</p>
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
  );
}

export default ExpenseForm;
