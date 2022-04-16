import React from "react";
import GoalsChart from "./GoalsChart";

function GoalsCharts({ goals }) {
  return (
    <div className="text-center mt-10 border-t-2">
      <h1>Goals Charts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-items-center gap-1">
        {goals?.map((goal) => {
          const { goal: name, amount, savedMoney, id } = goal;
          return (
            <div key={id}>
              <div className="w-fit">
                <GoalsChart
                  name={name}
                  amount={amount}
                  savedMoney={savedMoney}
                />
                <h1 className="">{name}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GoalsCharts;
