import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";

function GoalsForm({
  session,
  nameInputTitle,
  moneyInputTitle,
  pageTitle,
  savedMoneyInputTitle,
  savedMoneyTitle,
}) {
  const nameInputRef = useRef();
  const moneyInputRef = useRef();
  const savedMoneyInputRef = useRef();

  const submitToDB = async (e) => {
    e.preventDefault();
    if (nameInputRef.current.value === "" || moneyInputRef.current.value === "")
      return;

    const docRef = await addDoc(
      collection(db, "users", session.user.uid, pageTitle),
      {
        [nameInputTitle]: nameInputRef.current.value,
        [moneyInputTitle]: parseInt(moneyInputRef.current.value),
        [savedMoneyInputTitle]: parseInt(savedMoneyInputRef.current.value),
        userID: session.user.uid,
        email: session.user.email,
        timestamp: serverTimestamp(),
      }
    );

    nameInputRef.current.value = "";
    moneyInputRef.current.value = "";
    savedMoneyInputRef.current.value = "";
  };
  return (
    <div className="formContainer">
      <h1 className="formTitle">Add your monthly {pageTitle}</h1>
      <form onSubmit={submitToDB}>
        <div className="formInputContainer">
          <p className="formInputTitle">{nameInputTitle}:</p>
          <input
            type="text"
            ref={nameInputRef}
            placeholder="name...."
            className="fromInput"
          />
        </div>

        <div className="formInputContainer">
          <p className="formInputTitle">{moneyInputTitle}:</p>
          <input
            type="number"
            ref={moneyInputRef}
            placeholder="amount...."
            className="fromInput"
          />
        </div>

        <div className="formInputContainer">
          <p className="formInputTitle">{savedMoneyTitle}:</p>
          <input
            type="number"
            ref={savedMoneyInputRef}
            placeholder="amount...."
            className="fromInput"
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

export default GoalsForm;
