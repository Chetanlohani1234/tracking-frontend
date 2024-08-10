import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DataService from "../services/data.service";
import { ToastContainer, toast } from "react-toastify";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const EmployePerformaceGraph = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeframe, setTimeframe] = useState("monthly");
  const navigate = useNavigate();
  const [totalPerformace, setTotalPerformace] = useState("");

  useEffect(() => {
    document.title = "Check Performance";
    window.scrollTo(0, 0);
    getPerformanceById();
  }, []);

  const getPerformanceById = () => {
    setLoading(true);
    DataService.getPerformaceEmpById(params?.id)
      .then((response) => {
        setTotalPerformace(response?.data?.data?.performance);

        const apiData = response?.data?.data;
        if (apiData) {
          // Transform API data into the required structure
          const monthly = apiData.historyMonth.map((item) => ({
            month: new Date(item.year, item.month - 1).toLocaleString(
              "default",
              {
                month: "short",
              }
            ),
            performance: item.performance,
          }));
          const quarterly = apiData.historyQuarter.map((item) => ({
            quarter: `Q${item.quarter}`,
            performance: item.performance,
          }));
          const yearly = apiData.historyYear.map((item) => ({
            year: item.year,
            performance: item.performance,
          }));

          // Update state with the transformed data
          setData({ monthly, quarterly, yearly });
        }
        setLoading(false);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(resMessage, {});
      });
  };

  const handleButtonClick = (timeframe) => {
    setTimeframe(timeframe);
  };

  const renderLineChart = () => {
    const chartData = data[timeframe] || [];
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={
              timeframe === "monthly"
                ? "month"
                : timeframe === "quarterly"
                ? "quarter"
                : "year"
            }
          />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line
            type="monotone"
            dataKey="performance"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="main-sec-dashboard">
      <div className="top-bar-content">
        <h2>Employee Performance</h2>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button
          className={`line-graph-btn ${
            timeframe === "monthly" ? "active-line-btn" : ""
          }`}
          onClick={() => handleButtonClick("monthly")}
        >
          Monthly
        </button>
        <button
          className={`line-graph-btn ${
            timeframe === "quarterly" ? "active-line-btn" : ""
          }`}
          onClick={() => handleButtonClick("quarterly")}
        >
          Quarterly
        </button>
        <button
          className={`line-graph-btn ${
            timeframe === "yearly" ? "active-line-btn" : ""
          }`}
          onClick={() => handleButtonClick("yearly")}
        >
          Yearly
        </button>
        <div className="main-heading-performance">
          <h2>Overall Performance: {totalPerformace}%</h2>
        </div>
      </div>
      {loading ? <p>Loading...</p> : renderLineChart()}
    </div>
  );
};

export default EmployePerformaceGraph;
