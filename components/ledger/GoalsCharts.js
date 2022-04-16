import React from "react";
import GoalsChart from "./GoalsChart";

function GoalsCharts({ goals }) {
  return (
    <div className="text-center mt-10 pt-10 border-t-2 border-[#8985F2]">
      <h1 className="text-2xl text-[#F26BDC] mb-5">Goals Chart</h1>
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GoalsCharts;
