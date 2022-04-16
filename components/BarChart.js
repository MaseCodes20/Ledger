import React from "react";
import "chart.js/auto";
import { Bar, Chart } from "react-chartjs-2";

function BarChart({ money, name, label }) {
  const data = {
    labels: [...name],
    datasets: [
      {
        label: label,
        data: [...money],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
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
    scales: {
      y: {
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value) {
            return `$${value}`;
          },
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };
  return (
    <>
      {money.length > 0 && (
        <div className="lg:w-[500px] mx-auto mt-10">
          <Bar type="bar" data={data} options={options} />
        </div>
      )}
    </>
  );
}

export default BarChart;
