import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js"; // Importing Chart.js

// Import the necessary chart.js components directly
import { CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement } from "chart.js";

// Register chart components globally once
ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineElement);

const CardLineChart = () => {
  // Chart data configuration
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default CardLineChart;
