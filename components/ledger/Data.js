import { useEffect, useState } from "react";
import Goals from "./Goals";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import DoughnutChart from "../DoughnutChart";
import BarChart from "../BarChart";

function Data({ session }) {
  const [incomes, setIncomes] = useState([]);
  const [bills, setBills] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "incomes"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        setIncomes(snapshot.docs);
      }
    );
  }, [db]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "expense"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        setBills(snapshot.docs);
      }
    );
  }, [db]);

  const sum = (income) => {
    return income.reduce((a, b) => a + b, 0);
  };

  const getIncome = incomes.map((income) => income.data().income);
  const getJobs = incomes.map((name) => name.data().job);
  const getBills = bills.map((bill) => bill.data().fee);
  const getCompany = bills.map((name) => name.data().company);

  const incomeTotal = sum(getIncome);
  const billTotal = sum(getBills);

  const Remaining = incomeTotal - billTotal;

  const billsLabel = "Bills";
  const incomeLabel = "Income";

  return (
    <div className="rightSideContainer">
      <div className="flex items-center">
        <DoughnutChart billTotal={billTotal} Remaining={Remaining} />
        <div className="">
          <BarChart money={getBills} name={getCompany} label={billsLabel} />
          <BarChart money={getIncome} name={getJobs} label={incomeLabel} />
        </div>
      </div>

      {/* Goals pie chart */}
      <Goals />
    </div>
  );
}

export default Data;
