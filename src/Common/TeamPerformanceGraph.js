import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataService from "../services/data.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const TeamPerformanceGraph = () => {
  const params = useParams();
  const [data, setData] = useState([{ name: "Team Performance", performance: 0 }]);
  const [totalPerformance, setTotalPerformance] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Team Performance";
    getPerformanceById();
  }, []);

  const getPerformanceById = () => {
    setLoading(true);
    DataService.getPerformaceById(params?.id)
      .then((response) => {
        const teamPerformance = response?.data?.teamPerformance || 0;

        // Update total performance state
        setTotalPerformance(teamPerformance);

        // Update chart data
        setData([{ name: "Team Performance", performance: teamPerformance }]);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setLoading(false);
        toast.error(errorMessage, {});
      });
  };

  const renderLineChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="performance"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false} // Disable dots on the line
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div>
      <ToastContainer />
      <div className="main-heading-performance">
        <h2>Overall Performance: {totalPerformance}%</h2>
      </div>
      {loading ? <p>Loading...</p> : renderLineChart()}
    </div>
  );
};

export default TeamPerformanceGraph;
