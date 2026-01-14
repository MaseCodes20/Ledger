import ExpenseAndIncomeCard from "../ExpenseAndIncomeCard";
import Form from "../Form";
import useFetchData from "../../hooks/useFetchData";
import LoadingScreen from "../LoadingScreen";
import ShowTotal from "../ShowTotal";
import { Session } from "next-auth";
import { total } from "../../utils";

type IncomeProps = {
  session: Session
}

function Income({ session }: IncomeProps) {
  const { incomes, loadingIncomes } = useFetchData(session);

  const cardTitle = "Income";
  const incomePageTitle = "incomes";
  const nameInputTitle = "job";
  const moneyInputTitle = "income";

  const incomeTotal = total(incomes, moneyInputTitle);

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
              <ShowTotal title={cardTitle} total={incomeTotal} />

              <div className="cardsGrid">
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
