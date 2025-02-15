import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";

// Simple CardBarChart component
const CardBarChart = () => {
  // Simple chart data configuration
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Return the Bar chart JSX
  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default CardBarChart;
