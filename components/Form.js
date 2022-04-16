import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../firebase";

function Form({ session, nameInputTitle, moneyInputTitle, pageTitle }) {
  const nameInputRef = useRef();
  const moneyInputRef = useRef();

  const submitToDB = async (e) => {
    e.preventDefault();
    if (nameInputRef.current.value === "" || moneyInputRef.current.value === "")
      return;

    const docRef = await addDoc(
      collection(db, "users", session.user.uid, pageTitle),
      {
        [nameInputTitle]: nameInputRef.current.value,
        [moneyInputTitle]: parseInt(moneyInputRef.current.value),
        userID: session.user.uid,
        email: session.user.email,
        timestamp: serverTimestamp(),
      }
    );

    nameInputRef.current.value = "";
    moneyInputRef.current.value = "";
  };
  return (
    <div className="bg-[#231B40] border-2 border-[#8985F2] w-fit mx-auto text-center rounded-lg p-2">
      <h1 className="text-center font-semibold">
        Add your monthly {pageTitle}
      </h1>
      <form onSubmit={submitToDB}>
        <div className="flex my-2">
          <p className="mr-2">{nameInputTitle}:</p>
          <input
            type="text"
            ref={nameInputRef}
            placeholder="name...."
            className="w-full text-black"
          />
        </div>

        <div className="flex my-2">
          <p className="mr-2">{moneyInputTitle}:</p>
          <input
            type="number"
            ref={moneyInputRef}
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

export default Form;
