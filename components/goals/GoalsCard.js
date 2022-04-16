import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState, useRef } from "react";
import { db } from "../../firebase";
import UpdateDeleteButtons from "../UpdateDeleteButtons";

function GoalsCard({
  id,
  session,
  money,
  saved,
  name,
  pageTitle,
  nameInputTitle,
  moneyInputTitle,
  savedMoneyInputTitle,
  savedMoneyTitle,
  cardTitle,
}) {
  const [selected, setSelected] = useState(null);

  const nameInputRef = useRef();
  const moneyInputRef = useRef();
  const savedMoneyInputRef = useRef();

  const updateDocument = async (e, id) => {
    e.preventDefault();
    if (
      nameInputRef.current.value === "" &&
      moneyInputRef.current.value === "" &&
      savedMoneyInputRef.current.value === ""
    )
      return;

    const documentRef = doc(db, "users", session.user.uid, pageTitle, id);

    await updateDoc(documentRef, {
      [nameInputTitle]:
        nameInputRef.current.value !== "" ? nameInputRef.current.value : name,
      [moneyInputTitle]:
        moneyInputRef.current.value !== ""
          ? parseInt(moneyInputRef.current.value)
          : money,
      [savedMoneyTitle]:
        savedMoneyInputRef.current.value !== ""
          ? parseInt(savedMoneyInputRef.current.value)
          : savedMoneyTitle,
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

      <div className="flex">
        <p className="cardsInputTitle">{savedMoneyInputTitle}:</p>
        <p className="cardsValue">${saved}</p>
      </div>
      <UpdateDeleteButtons
        id={id}
        setSelected={setSelected}
        session={session}
        pageTitle={pageTitle}
      />

      {selected === id && (
        <div className="text-center">
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

            <div className="flex my-2">
              <p className="cardsInputTitle">{savedMoneyInputTitle}:</p>
              <input
                type="number"
                ref={savedMoneyInputRef}
                placeholder="amount...."
                className="w-full text-black"
              />
            </div>

            <div className="flex justify-center mt-3">
              <input
                type="submit"
                className="cursor-pointer rounded-full bg-white text-black p-1 mx-1"
              />
              <button
                onClick={() => setSelected(null)}
                className="rounded-full bg-white text-black p-1 mx-1"
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

export default GoalsCard;
