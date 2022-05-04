import React from "react";
import useFetchData from "../../hooks/useFetchData";
import LoadingScreen from "../LoadingScreen";
import InvestmentCard from "./InvestmentCard";
import InvestmentForm from "./InvestmentForm";

function Investments({ session }) {
  const { investments, loadingInvestments } = useFetchData(session);

  return (
    <div className="rightSideContainer">
      <InvestmentForm session={session} />

      {loadingInvestments ? (
        <LoadingScreen />
      ) : (
        <div className="cardsGrid">
          {investments?.map((investment) => {
            const { id, company, invested, shares, dividend } = investment;
            return (
              <InvestmentCard
                key={id}
                id={id}
                session={session}
                company={company}
                invested={invested}
                shares={shares}
                dividend={dividend}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Investments;
