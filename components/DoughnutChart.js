import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

function DoughnutChart({ billTotal, Remaining, incomeTotal }) {
  const data = {
    labels: ["Expense", "Remaining"],
    datasets: [
      {
        label: "My First Dataset",
        data: [billTotal, Remaining],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        borderColor: "black",
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          color: "white",
          font: {
            size: 14,
          },
        },
      },
    },
  };
  return (
    <div className="lg:w-[500px] h-fit mx-auto mt-10 relative">
      <Chart type="doughnut" data={data} options={options} />
      <div className="totalIncomeContainer">
        <div className="totalIncomeCircle">
          <div className="centeredOnScreen">
            <div className="hidden lg:flex">
              <h1 className="mx-auto hidden lg:flex">Income</h1>
            </div>
            <p className="text-sm lg:text-2xl mt-5 lg:mt-0">${incomeTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoughnutChart;
