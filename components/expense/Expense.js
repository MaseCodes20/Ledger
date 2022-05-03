import useFetchData from "../../hooks/useFetchData";
import total from "../../utils/total";
import ExpenseAndIncomeCard from "../ExpenseAndIncomeCard";
import Form from "../Form";
import LoadingScreen from "../LoadingScreen";
import ShowTotal from "../ShowTotal";

function Expense({ session }) {
  const { bills, loadingExpense } = useFetchData(session);

  const cardTitle = "Bill";
  const pageTitle = "expense";
  const nameInputTitle = "expense";
  const moneyInputTitle = "fee";

  const billsTotal = total(bills, moneyInputTitle);

  return (
    <div className="rightSideContainer">
      <Form
        session={session}
        pageTitle={pageTitle}
        nameInputTitle={nameInputTitle}
        moneyInputTitle={moneyInputTitle}
      />
      {loadingExpense ? (
        <LoadingScreen />
      ) : (
        <>
          <ShowTotal title={`${cardTitle}s`} total={billsTotal} />

          {bills && (
            <>
              <div className="cardsGrid">
                {bills?.map((bill) => {
                  const { expense, fee: debt, id } = bill;
                  return (
                    <ExpenseAndIncomeCard
                      key={id}
                      id={id}
                      session={session}
                      pageTitle={pageTitle}
                      money={debt}
                      name={expense}
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

export default Expense;
