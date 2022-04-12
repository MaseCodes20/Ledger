import React from "react";
import SideBar from "../SideBar";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

function Ledger() {
  const data = {
    labels: ["Expense", "Remaining"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 relative overflow-y-auto">
        <div className="w-[500px] mx-auto mt-10">
          <Chart type="doughnut" data={data} />
        </div>
        {/* Goals pie chart */}
        <div className="text-center mt-10 border-t-2 ">
          <h1>Goals</h1>
        </div>
      </div>
    </div>
  );
}

export default Ledger;
