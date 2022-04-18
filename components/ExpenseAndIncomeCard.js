import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState, useRef } from "react";
import { db } from "../firebase";
import UpdateDeleteButtons from "./UpdateDeleteButtons";

function ExpenseAndIncomeCard({
  id,
  session,
  money,
  name,
  pageTitle,
  nameInputTitle,
  moneyInputTitle,
  cardTitle,
}) {
  const [selected, setSelected] = useState(null);

  const nameInputRef = useRef();
  const moneyInputRef = useRef();

  const updateDocument = async (e, id) => {
    e.preventDefault();
    if (nameInputRef.current.value === "" && moneyInputRef.current.value === "")
      return;

    const documentRef = doc(db, "users", session.user.uid, pageTitle, id);

    await updateDoc(documentRef, {
      [nameInputTitle]:
        nameInputRef.current.value !== "" ? nameInputRef.current.value : name,
      [moneyInputTitle]:
        moneyInputRef.current.value !== ""
          ? parseInt(moneyInputRef.current.value)
          : money,
      timestamp: serverTimestamp(),
    });

    setSelected(null);
  };

  return (
    <div className="cardsContainer">
      <h1 className="cardsTitle">{cardTitle}</h1>
      <div className="flex">
        <p className="cardsInputTitle">{nameInputTitle}:</p>
        <p className="cardsValue">{name}</p>
      </div>

      <div className="flex">
        <p className="cardsInputTitle">{moneyInputTitle}:</p>
        <p className="cardsValue">${money}</p>
      </div>

      <UpdateDeleteButtons
        id={id}
        setSelected={setSelected}
        session={session}
        pageTitle={pageTitle}
      />

      {selected === id && (
        <div className="formContainer">
          <h1 className="formTitle text-[#BF9B6F]">Update</h1>
          <form onSubmit={(e) => updateDocument(e, id)}>
            <div className="flex my-2">
              <p className="cardsInputTitle">{nameInputTitle}:</p>
              <input
                type="text"
                ref={nameInputRef}
                placeholder="name...."
                className="w-full text-black"
              />
            </div>

            <div className="flex my-2">
              <p className="cardsInputTitle">{moneyInputTitle}:</p>
              <input
                type="number"
                ref={moneyInputRef}
                placeholder="amount...."
                className="w-full text-black"
              />
            </div>

            <div className="flex justify-center mt-3">
              <input
                type="submit"
                className="submitAndCancelButtons submitButton"
              />
              <button
                onClick={() => setSelected(null)}
                className="submitAndCancelButtons cancelButton"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ExpenseAndIncomeCard;
