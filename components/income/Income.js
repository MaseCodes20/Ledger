import ExpenseAndIncomeCard from "../ExpenseAndIncomeCard";
import Form from "../Form";
import useFetchData from "../../hooks/useFetchData";
import LoadingScreen from "../LoadingScreen";

function Income({ session }) {
  const { incomes, loadingIncomes } = useFetchData(session);

  const cardTitle = "Income";
  const incomePageTitle = "incomes";
  const nameInputTitle = "job";
  const moneyInputTitle = "income";

  const total = incomes
    ?.map((income) => income.income)
    .reduce((a, c) => a + c, 0);
  // console.log("total:", total);
  return (
    <div className="rightSideContainer">
      <Form
        session={session}
        pageTitle={incomePageTitle}
        nameInputTitle={nameInputTitle}
        moneyInputTitle={moneyInputTitle}
      />

      {loadingIncomes ? (
        <LoadingScreen />
      ) : (
        <>
          {incomes && (
            <>
              <div className="incomeAndExpenseGrid">
                {incomes?.map((income) => {
                  const { job, income: salary, id } = income;
                  return (
                    <ExpenseAndIncomeCard
                      key={id}
                      id={id}
                      session={session}
                      pageTitle={incomePageTitle}
                      money={salary}
                      name={job}
                      nameInputTitle={nameInputTitle}
                      moneyInputTitle={moneyInputTitle}
                      cardTitle={cardTitle}
                    />
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Income;
