import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { db } from "../../firebase";

function InvestmentForm({ session }) {
  const companyRef = useRef();
  const investedRef = useRef();
  const sharesRef = useRef();
  const dividendRef = useRef();

  const submitInvestment = async (e) => {
    e.preventDefault();
    if (companyRef.current.value === "" || investedRef.current.value === "")
      return;

    await addDoc(collection(db, "users", session.user.uid, "investments"), {
      company: companyRef.current.value,
      invested: parseInt(investedRef.current.value),
      shares:
        sharesRef.current.value !== ""
          ? parseFloat(sharesRef.current.value)
          : 0,
      dividend:
        dividendRef.current.value !== ""
          ? parseFloat(dividendRef.current.value).toFixed(2)
          : 0,
      userID: session.user.uid,
      email: session.user.email,
      timestamp: serverTimestamp(),
    });

    companyRef.current.value = "";
    investedRef.current.value = "";
    sharesRef.current.value = "";
    dividendRef.current.value = "";
  };

  return (
    <div className="formContainer">
      <h1>Add your Investment</h1>
      <form onSubmit={submitInvestment}>
        <div className="formInputContainer">
          <p className="formInputTitle">Company:</p>
          <input
            type="text"
            ref={companyRef}
            placeholder="name...."
            className="formInput"
          />
        </div>
        <div className="formInputContainer">
          <p className="formInputTitle">Money Invested:</p>
          <input
            type="number"
            ref={investedRef}
            placeholder="amount...."
            className="formInput"
          />
        </div>
        <div className="formInputContainer">
          <p className="formInputTitle">Shares:</p>
          <input
            type="number"
            ref={sharesRef}
            placeholder="amount...."
            className="formInput"
            step=".01"
            pattern="^\d+(?:\.\d{1,2})?$"
          />
        </div>
        <div className="formInputContainer">
          <p className="formInputTitle">Annual Dividend per share:</p>
          <input
            type="number"
            ref={dividendRef}
            placeholder="amount...."
            className="formInput"
            step=".01"
            pattern="^\d+(?:\.\d{1,2})?$"
          />
        </div>

        <input type="submit" className="formSubmitButton" />
      </form>
    </div>
  );
}

export default InvestmentForm;
