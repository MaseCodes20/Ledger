import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState, useRef } from "react";
import { db } from "../../firebase";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import dividendTotal from "../../utils/dividendTotal";
import UpdateDeleteButtons from "../UpdateDeleteButtons";

function InvestmentCard({ id, company, invested, shares, dividend, session }) {
  const [selected, setSelected] = useState(null);

  const companyRef = useRef();
  const investedRef = useRef();
  const sharesRef = useRef();
  const dividendRef = useRef();

  const updateInvestment = async (e, id) => {
    e.preventDefault();
    if (
      companyRef.current.value === "" &&
      investedRef.current.value === "" &&
      sharesRef.current.value === "" &&
      dividendRef.current.value === ""
    )
      return;

    const documentRef = doc(db, "users", session.user.uid, "investments", id);

    await updateDoc(documentRef, {
      company:
        companyRef.current.value !== "" ? companyRef.current.value : company,
      invested:
        investedRef.current.value !== ""
          ? parseInt(investedRef.current.value)
          : invested,
      shares:
        sharesRef.current.value !== ""
          ? parseFloat(sharesRef.current.value)
          : shares,
      dividend:
        dividendRef.current.value !== ""
          ? parseFloat(dividendRef.current.value).toFixed(2)
          : dividend,
      timestamp: serverTimestamp(),
    });

    setSelected(null);
  };

  const totalDividend = dividendTotal(shares, dividend);
  return (
    <div className="cardsContainer">
      <h1 className="cardsTitle">Investment</h1>
      <div className="cardItemsContainer">
        <p className="cardsInputTitle">{capitalizeFirstLetter("company")}:</p>
        <p className="cardsValue">{company}</p>
      </div>

      <div className="cardItemsContainer">
        <p className="cardsInputTitle">{capitalizeFirstLetter("Invested")}:</p>
        <p className="cardsValue">${invested.toLocaleString()}</p>
      </div>

      <div className="cardItemsContainer">
        <p className="cardsInputTitle">{capitalizeFirstLetter("Shares")}:</p>
        <p className="cardsValue">{shares.toLocaleString()}</p>
      </div>

      <div className="cardItemsContainer items-center">
        <p className="cardsInputTitle">
          {capitalizeFirstLetter("Annual Dividend Per Share")}:
        </p>
        <p className="cardsValue">${dividend.toLocaleString()}</p>
      </div>

      <div className="cardItemsContainer items-center">
        <p className="cardsInputTitle">
          {capitalizeFirstLetter("Dividend total")}:
        </p>
        <p className="cardsValue">${totalDividend.toLocaleString()}</p>
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
            <div className="cardItemsContainer my-2">
              <p className="cardsInputTitle">Company:</p>
              <input
                type="text"
                ref={companyRef}
                placeholder="name...."
                className="formInput"
              />
            </div>

            <div className="cardItemsContainer my-2">
              <p className="cardsInputTitle">Invested:</p>
              <input
                type="number"
                ref={investedRef}
                placeholder="amount...."
                className="formInput"
              />
            </div>

            <div className="cardItemsContainer my-2">
              <p className="cardsInputTitle">Shares:</p>
              <input
                type="number"
                ref={sharesRef}
                placeholder="amount...."
                className="formInput"
                step=".01"
                pattern="^\d+(?:\.\d{1,2})?$"
              />
            </div>

            <div className="cardItemsContainer my-2">
              <p className="cardsInputTitle">Annual Dividend Per Share:</p>
              <input
                type="number"
                ref={dividendRef}
                placeholder="amount...."
                className="formInput"
                step=".01"
                pattern="^\d+(?:\.\d{1,2})?$"
              />
            </div>

            <div className="cardItemsContainer justify-center mt-3">
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
