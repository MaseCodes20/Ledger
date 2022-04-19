import ExpenseAndIncomeCard from "../ExpenseAndIncomeCard";
import Form from "../Form";
import useFetchData from "../../hooks/useFetchData";

function Income({ session }) {
  const { incomes } = useFetchData(session);

  const cardTitle = "Income";
  const incomePageTitle = "incomes";
  const nameInputTitle = "job";
  const moneyInputTitle = "income";

  return (
    <div className="rightSideContainer">
      <Form
        session={session}
        pageTitle={incomePageTitle}
        nameInputTitle={nameInputTitle}
        moneyInputTitle={moneyInputTitle}
      />

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
    </div>
  );
}

export default Income;
