import useFetchData from "../../hooks/useFetchData";
import LoadingScreen from "../LoadingScreen";
import GoalsCard from "./GoalsCard";
import GoalsForm from "./GoalsForm";

function Goals({ session }) {
  const { goals, loadingGoals } = useFetchData(session);

  const cardTitle = "Goal";
  const pageTitle = "goals";
  const nameInputTitle = "goal";
  const moneyInputTitle = "amount";
  const savedMoneyInputTitle = "money saved";
  const savedMoneyTitle = "savedMoney";

  return (
    <div className="rightSideContainer">
      <GoalsForm
        session={session}
        pageTitle={pageTitle}
        nameInputTitle={nameInputTitle}
        moneyInputTitle={moneyInputTitle}
        savedMoneyInputTitle={savedMoneyTitle}
        savedMoneyTitle={savedMoneyInputTitle}
      />

      {loadingGoals ? (
        <LoadingScreen />
      ) : (
        <>
          {goals && (
            <>
              <div className="cardsGrid">
                {goals?.map((goal) => {
                  const { goal: name, amount, id, savedMoney } = goal;
                  return (
                    <GoalsCard
                      key={id}
                      id={id}
                      session={session}
                      pageTitle={pageTitle}
                      money={amount}
                      saved={savedMoney}
                      name={name}
                      savedMoneyTitle={savedMoneyTitle}
                      nameInputTitle={nameInputTitle}
                      moneyInputTitle={moneyInputTitle}
                      savedMoneyInputTitle={savedMoneyInputTitle}
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

export default Goals;
