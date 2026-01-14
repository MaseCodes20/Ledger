import React from "react";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Doughnut } from "react-chartjs-2";

// Specifically register the elements needed for a Doughnut chart
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({ billTotal, Remaining, incomeTotal }) {
  const data = {
    labels: ["Expense", "Remaining"],
    datasets: [
      {
        label: "Expense Chart",
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
      {/* Change <Chart type="doughnut" /> to <Doughnut /> */}
      <Doughnut data={data} options={options} />
      
      <div className="totalIncomeContainer">
        <div className="totalIncomeCircle">
          <div className="centeredOnScreen">
            <div className="hidden lg:flex">
              <h1 className="mx-auto hidden lg:flex">Income</h1>
            </div>
            <p className="text-sm lg:text-2xl mt-5 lg:mt-0">
              ${incomeTotal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoughnutChart;