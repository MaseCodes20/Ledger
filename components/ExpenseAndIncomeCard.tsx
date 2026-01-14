import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState, useRef } from "react";
import { db } from "../firebase";
import UpdateDeleteButtons from "./UpdateDeleteButtons";
import { capitalizeFirstLetter } from "../utils";
import { Session } from "next-auth";

type ExpenseAndIncomeCardProps = {
  id: string
  session: Session
  money: string
  name: string
  pageTitle: string
  nameInputTitle: string
  moneyInputTitle: string
  cardTitle: string
}

function ExpenseAndIncomeCard({
  id,
  session,
  money,
  name,
  pageTitle,
  nameInputTitle,
  moneyInputTitle,
  cardTitle,
}: ExpenseAndIncomeCardProps) {
  const [selected, setSelected] = useState(null);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const moneyInputRef = useRef<HTMLInputElement>(null);

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
      <div className="cardItemsContainer">
        <p className="cardsInputTitle">
          {capitalizeFirstLetter(nameInputTitle)}:
        </p>
        <p className="cardsValue">{name}</p>
      </div>

      <div className="cardItemsContainer">
        <p className="cardsInputTitle">
          {capitalizeFirstLetter(moneyInputTitle)}:
        </p>
        <p className="cardsValue">${money.toLocaleString()}</p>
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
                className="formInput"
              />
            </div>

            <div className="flex my-2">
              <p className="cardsInputTitle">{moneyInputTitle}:</p>
              <input
                type="number"
                ref={moneyInputRef}
                placeholder="amount...."
                className="formInput"
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
                aria-label="Cancel button"
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
