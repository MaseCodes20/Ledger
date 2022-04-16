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
    <div className="bg-blue-400 p-2 my-2 w-[200px] h-fit rounded-md text-center">
      <h1 className="font-bold uppercase text-pink-500">{cardTitle}</h1>
      <div className="flex">
        <p className="mr-2">{nameInputTitle}:</p>
        <p>{name}</p>
      </div>

      <div className="flex">
        <p className="mr-2">{moneyInputTitle}:</p>
        <p>${money}</p>
      </div>

      <div className="flex">
        <p className="mr-2">{savedMoneyInputTitle}:</p>
        <p>${saved}</p>
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

            <div className="flex my-2">
              <p className="mr-2">{savedMoneyInputTitle}:</p>
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
