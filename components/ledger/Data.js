import DoughnutChart from "../DoughnutChart";
import BarChart from "../BarChart";
import GoalsCharts from "./GoalsCharts";
import WelcomeUser from "./WelcomeUser";
import useFetchData from "../../hooks/useFetchData";
import LoadingScreen from "../LoadingScreen";

function Data({ session }) {
  const { incomes, bills, goals, loadingIncomes } = useFetchData(session);

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
  const billsColor = "rgba(255, 99, 132, 0.6)";
  const incomeLabel = "Income";
  const incomeColor = "rgba(34, 197, 94, .6)";

  return (
    <div className="rightSideContainer">
      {!loadingIncomes && (
        <>
          {incomeTotal > 0 ? (
            <div className="lg:flex items-center w-full">
              <DoughnutChart
                billTotal={billTotal}
                Remaining={Remaining}
                incomeTotal={incomeTotal}
              />
              <div className="mt-10 mx-auto">
                <BarChart
                  money={getBills}
                  name={getCompany}
                  label={billsLabel}
                  color={billsColor}
                />
                <BarChart
                  money={getIncome}
                  name={getJobs}
                  label={incomeLabel}
                  color={incomeColor}
                />
              </div>
            </div>
          ) : (
            <WelcomeUser session={session} goals={goals} />
          )}
        </>
      )}

      {/* {!loadingIncomes && <WelcomeUser session={session} />} */}

      {goals.length > 0 && <GoalsCharts goals={goals} />}
    </div>
  );
}

export default Data;
