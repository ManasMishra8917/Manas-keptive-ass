import React from "react";
import { Bar } from "react-chartjs-2";
import { FiSettings } from 'react-icons/fi';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
  Legend
);

// JSON data
const data = {
  "Sheet1": [
    { "Year": "2015-16", "COGS": 220, "GrossProfit": 100, "Revenue": 50 },
    { "Year": "2016-17", "COGS": 300, "GrossProfit": 120, "Revenue": 160 },
    { "Year": "2017-18", "COGS": 150, "GrossProfit": 100, "Revenue": 90 },
    { "Year": "2018-19", "COGS": 117, "GrossProfit": 100, "Revenue": 97 },
    { "Year": "2019-20", "COGS": 200, "GrossProfit": 100, "Revenue": 50 },
    { "Year": "2020-21", "COGS": 400, "GrossProfit": 120, "Revenue": 160 },
    { "Year": "2021-22", "COGS": 150, "GrossProfit": 100, "Revenue": 90 },
    { "Year": "2022-23", "COGS": 117, "GrossProfit": 100, "Revenue": 97 },
  ]
};

// Function to format the data
const formatData = (data) => {
  const labels = data.Sheet1.map(item => item.Year);
  const cogsData = data.Sheet1.map(item => item.COGS);
  const grossProfitData = data.Sheet1.map(item => item.GrossProfit);
  const revenueData = data.Sheet1.map(item => item.Revenue);

  return {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: revenueData,
        backgroundColor: 'rgb(179,138,223)',
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: 'COGS',
        data: cogsData,
        backgroundColor: 'rgb(3,174,250)',
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: 'Gross Profit',
        data: grossProfitData,
        backgroundColor: 'rgb(236,157,69)',
        borderWidth: 2,
        barThickness: 20,
      }
    ]
  };
};

// Function to calculate growth percentages
const calculateGrowth = (data) => {
  const growthData = data.Sheet1.map((item, index, array) => {
    if (index === 0) return { Year: item.Year, COGS: 0, GrossProfit: 0, Revenue: 0 };
    const prevItem = array[index - 1];
    return {
      Year: item.Year,
      COGS: ((item.COGS - prevItem.COGS) / prevItem.COGS) * 100,
      GrossProfit: ((item.GrossProfit - prevItem.GrossProfit) / prevItem.GrossProfit) * 100,
      Revenue: ((item.Revenue - prevItem.Revenue) / prevItem.Revenue) * 100,
    };
  });

  const labels = growthData.map(item => item.Year);
  const cogsGrowth = growthData.map(item => item.COGS);
  const grossProfitGrowth = growthData.map(item => item.GrossProfit);
  const revenueGrowth = growthData.map(item => item.Revenue);

  return {
    labels,
    datasets: [
      {
        label: 'Revenue Growth (%)',
        data: revenueGrowth,
        backgroundColor: 'rgb(179,138,223)',
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: 'COGS Growth (%)',
        data: cogsGrowth,
        backgroundColor: 'rgb(3,174,250)',
        borderWidth: 1,
        barThickness: 20,
      },
      {
        label: 'Gross Profit Growth (%)',
        data: grossProfitGrowth,
        backgroundColor: 'rgb(236,157,69)',
        borderWidth: 2,
        barThickness: 20,
      }
    ]
  };
};

const chartData = formatData(data);
const growthData = calculateGrowth(data);

const BarChart = ({ view }) => {
  const data = view === "growth" ? growthData : chartData;
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "80vw" }}>
        <Bar
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                max: view === "growth" ? undefined : 500,
                ticks: {
                  stepSize: view === "growth" ? undefined : 100,
                }
              }
            },
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          }}
          height={400}
        />
      </div>
    </div>
  );
};
export default BarChart