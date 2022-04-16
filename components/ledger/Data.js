import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import DoughnutChart from "../DoughnutChart";
import BarChart from "../BarChart";
import GoalsCharts from "./GoalsCharts";

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
  const getCompany = bills.map((name) => name.data().expense);

  const incomeTotal = sum(getIncome);
  const billTotal = sum(getBills);

  const Remaining = incomeTotal - billTotal;

  const billsLabel = "Bills";
  const incomeLabel = "Income";

  return (
    <div className="rightSideContainer">
      <div className="lg:flex items-center w-full">
        <DoughnutChart
          billTotal={billTotal}
          Remaining={Remaining}
          incomeTotal={incomeTotal}
        />
        <div className="">
          <BarChart money={getBills} name={getCompany} label={billsLabel} />
          <BarChart money={getIncome} name={getJobs} label={incomeLabel} />
        </div>
      </div>

      {/* Goals pie chart */}
      <GoalsCharts />
    </div>
  );
}

export default Data;
