import useFetchData from "../../hooks/useFetchData";
import total from "../../utils/total";
import LoadingScreen from "../LoadingScreen";
import ShowTotal from "../ShowTotal";
import GoalsCard from "./GoalsCard";
import GoalsForm from "./GoalsForm";

function Goals({ session }) {
  const { goals, loadingGoals } = useFetchData(session);

  const cardTitle = "Goal";
  const pageTitle = "goals";
  const nameInputTitle = "goal";
  const moneyInputTitle = "amount";
  const savedMoneyInputTitle = "Money saved";
  const savedMoneyTitle = "savedMoney";

  const savedTotal = total(goals, savedMoneyTitle);

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
              <ShowTotal title={"Savings"} total={savedTotal} />

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
