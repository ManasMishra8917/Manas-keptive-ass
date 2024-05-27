import {Bar} from "react-chartjs-2";
import { FiSettings } from 'react-icons/fi';

import{
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
    {  }
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
        // borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        barThickness: 20, // Fixed bar width
        
      },
      {
        label: 'COGS',
        data: cogsData,
        backgroundColor: 'rgb(3,174,250)',
        // borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        barThickness: 20, // Fixed bar width
        
      },
      {
        label: 'Gross Profit',
        data: grossProfitData,
        backgroundColor: 'rgb(236,157,69)',
        // borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        barThickness: 20, // Fixed bar width
        
      }
      
    ]
  };
};

const chartData = formatData(data);

export const BarChart = () => {
  return (
    <>
    
      <div style={{ display: 'flex', alignItems:"center", justifyContent: 'flex-end', gap:"1%",paddingRight:"5%"}}>
        
      <FiSettings size={20} color="black" />
      <span>Setting</span>
    </div>
      
    
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      
            <div style={{ width: "80vw" }}>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                max: 500, // Limit the y-axis to 500
                                ticks: {
                                    stepSize: 100, // Set the step size to 100
                                }
                            }
                        },
                        plugins: {
                            legend: {
                                position: 'bottom',
                            },
                            // title: {
                            //     display: true,
                            //     text: 'Year-wise COGS, Gross Profit, and Revenue (2015-16 to 2022-23)',
                            // },
                        },
                    }}
                    height={400} // Fixed height
                />
            </div>
        </div>
        </>
    );
};