import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState, useRef } from "react";
import { db } from "../../firebase";
import UpdateDeleteButtons from "../UpdateDeleteButtons";

function InvestmentCard({
  id,
  company,
  marketValue,
  shares,
  dividend,
  session,
}) {
  const [selected, setSelected] = useState(null);

  const companyRef = useRef();
  const marketValueRef = useRef();
  const sharesRef = useRef();
  const dividendRef = useRef();

  const updateInvestment = async (e, id) => {
    e.preventDefault();
    if (
      companyRef.current.value === "" &&
      marketValueRef.current.value === "" &&
      sharesRef.current.value === "" &&
      dividendRef.current.value === ""
    )
      return;

    const documentRef = doc(db, "users", session.user.uid, "investments", id);

    await updateDoc(documentRef, {
      company:
        companyRef.current.value !== "" ? companyRef.current.value : company,
      marketValue:
        marketValueRef.current.value !== ""
          ? parseInt(marketValueRef.current.value)
          : marketValue,
      shares:
        sharesRef.current.value !== ""
          ? parseInt(sharesRef.current.value)
          : shares,
      dividend:
        dividendRef.current.value !== ""
          ? parseInt(dividendRef.current.value)
          : dividend,
      timestamp: serverTimestamp(),
    });

    setSelected(null);
  };

  return (
    <div className="cardsContainer">
      <h1 className="cardsTitle">Investment</h1>
      <div className="flex">
        <p className="cardsInputTitle">company:</p>
        <p className="cardsValue">{company}</p>
      </div>

      <div className="flex">
        <p className="cardsInputTitle">Market Value:</p>
        <p className="cardsValue">${marketValue.toLocaleString()}</p>
      </div>

      <div className="flex">
        <p className="cardsInputTitle">Shares:</p>
        <p className="cardsValue">{shares.toLocaleString()}</p>
      </div>

      <div className="flex items-center">
        <p className="cardsInputTitle">Annual Dividend Per Share:</p>
        <p className="cardsValue">${dividend.toLocaleString()}</p>
      </div>

      <UpdateDeleteButtons
        id={id}
        setSelected={setSelected}
        session={session}
        pageTitle={"investments"}
      />

      {selected === id && (
        <div className="formContainer">
          <h1 className="formTitle text-[#BF9B6F]">Update</h1>
          <form onSubmit={(e) => updateInvestment(e, id)}>
            <div className="flex my-2">
              <p className="cardsInputTitle">Company:</p>
              <input
                type="text"
                ref={companyRef}
                placeholder="name...."
                className="formInput"
              />
            </div>

            <div className="flex my-2">
              <p className="cardsInputTitle">Market Value:</p>
              <input
                type="number"
                ref={marketValueRef}
                placeholder="amount...."
                className="formInput"
              />
            </div>

            <div className="flex my-2">
              <p className="cardsInputTitle">Shares:</p>
              <input
                type="number"
                ref={sharesRef}
                placeholder="amount...."
                className="formInput"
              />
            </div>

            <div className="flex my-2">
              <p className="cardsInputTitle">Annual Dividend Per Share:</p>
              <input
                type="number"
                ref={dividendRef}
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

export default InvestmentCard;
