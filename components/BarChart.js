import React from "react";
import "chart.js/auto";
import { Bar, Chart } from "react-chartjs-2";

function BarChart({ money, name, label, color }) {
  const data = {
    labels: [...name],
    datasets: [
      {
        label: label,
        data: [...money],
        backgroundColor: [color],
        borderColor: [color],
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
