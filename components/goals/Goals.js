import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import GoalsCard from "./GoalsCard";
import GoalsForm from "./GoalsForm";

function Goals({ session }) {
  const [goals, setGoals] = useState([]);

  const cardTitle = "Goal";
  const pageTitle = "goals";
  const nameInputTitle = "goal";
  const moneyInputTitle = "amount";
  const savedMoneyInputTitle = "money saved";
  const savedMoneyTitle = "savedMoney";

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "users", session.user.uid, "goals"),
        where("email", "==", session?.user.email)
      ),
      (snapshot) => {
        setGoals(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );
  }, [db]);

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

      {goals && (
        <>
          <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-1 justify-items-center mt-4">
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

          {/* <p>{sumIncome(getSalary)}</p> */}
        </>
      )}
    </div>
  );
}

export default Goals;
