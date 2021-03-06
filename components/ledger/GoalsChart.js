import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

function GoalsChart({ name, amount, savedMoney }) {
  const remaining = amount - savedMoney;

  const data = {
    labels: ["Saved", "Remaining"],
    datasets: [
      {
        label: name,
        data: [savedMoney, remaining],
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
    <div className="lg:w-[300px] border-2 rounded-lg p-2 border-[#8985F2]">
      <Chart type="pie" data={data} options={options} />

      <h1 className="">{name}</h1>
    </div>
  );
}

export default GoalsChart;
