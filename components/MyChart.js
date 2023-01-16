import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Total Transactions",
      fill: true,
      lineTension: 0.45,
      backgroundColor: "#B57295",
      borderColor: "#B57295",
      borderCapStyle: "butt",
      borderDashOffset: 0.0,
      borderJoinStyle: "#B57295",
      pointBorderColor: "#B57295",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 5,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: "#B57295",
      pointHoverBorderColor: "#B57295",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [400, 453, 600, 800, 900, 990, 1080, 1100, 1200, 1500, 1000, 2000],
    },
  ],
};

const options = {
  maintainAspectRatio: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        borderDash: [4, 4],
      },
      // beginAtZero: true, // this works
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

const MyChart = () => <Line data={data} options={options} />;

export default MyChart;
