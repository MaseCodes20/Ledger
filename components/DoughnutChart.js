import React from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

function DoughnutChart({ billTotal, Remaining }) {
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
    <div className="w-[500px] mx-auto mt-10">
      <Chart type="doughnut" data={data} options={options} />
    </div>
  );
}

export default DoughnutChart;
