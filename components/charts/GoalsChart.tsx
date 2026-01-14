import React from "react";
// 1. Remove "chart.js/auto"
// 2. Import specific Pie components
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Pie } from "react-chartjs-2";

// 3. Register elements
ChartJS.register(ArcElement, Tooltip, Legend);

type GoalsChartProps = {
  name: string
  amount: number
  savedMoney: number
}

function GoalsChart({ name, amount, savedMoney }: GoalsChartProps) {
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
          color: "white",
          font: { size: 14 },
        },
      },
    },
  };

  return (
    <div className="lg:w-[300px] border-2 rounded-lg p-2 border-[#8985F2]">
      {/* 4. Use <Pie /> instead of <Chart type="pie" /> */}
      <Pie data={data} options={options} />

      <h1 className="text-center mt-2">{name}</h1>
    </div>
  );
}

export default GoalsChart;