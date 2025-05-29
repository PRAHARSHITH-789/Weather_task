import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  const navigate=useNavigate();
  const [filter, setFilter] = useState("Daily");
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [total, setTotal] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const year = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];

  // Fetch all data initially
  const add=()=>{
    navigate("/add-expense");
  }
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await fetch("http://localhost:8080/data");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setTotal(result);
      } catch (err) {
        console.error("Error fetching total data:", err);
      }
    };
    fetchAllData();
  }, []);

  // Compute chart data dynamically based on filter
  useEffect(() => {
    if (total.length === 0) return;

    const dailyData = week.map((day, index) => ({
      name: day,
      index,
      expenses: total
        .filter((expense) => new Date(expense.date).getDay() === index)
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    }));

    const monthlyData = month.map((mon, index) => ({
      name: mon,
      index,
      expenses: total
        .filter((expense) => new Date(expense.date).getMonth() === index)
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    }));

    const yearlyData = year.map((yr) => ({
      name: yr,
      index: yr,
      expenses: total
        .filter((expense) => new Date(expense.date).getFullYear() === yr)
        .reduce((sum, expense) => sum + Number(expense.amount || 0), 0),
    }));

    setChartData(filter === "Daily" ? dailyData : filter === "Monthly" ? monthlyData : yearlyData);
  }, [total, filter]);

  // Filter data based on selected index
  useEffect(() => {
    if (selectedIndex === null) {
      setFilteredData([]);
      return;
    }
    const filtered = total.filter((expense) => {
      const date = new Date(expense.date);
      return (
        (filter === "Daily" && date.getDay() === selectedIndex) ||
        (filter === "Monthly" && date.getMonth() === selectedIndex) ||
        (filter === "Yearly" && date.getFullYear() === selectedIndex)
      );
    });
    setFilteredData(filtered);
  }, [selectedIndex, filter, total]);

  return (
    <>
      {/* Navbar */}
      <div className="navbar navbar-expand-sm container-fluid mb-3 bg-danger">
        <ul className="navbar-nav p-3">
          <li className="nav-item">@Logo</li>
          <li className="btn btn-info nav-item position-absolute end-0 me-2" onClick={add}>
            ADD Expenses
          </li>        </ul>
      </div>

      {/* Filter Selection */}
      <div className="container row">
        <h2 className="col-6 text-center">Expenses</h2>
        <select
          className="w-50 col-6 text-center"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setSelectedIndex(null);
          }}
        >
          <option>Daily</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>

      {/* Chart */}
      <div style={{ overflowX: "auto", width: "100%" }}>
        <div style={{ width: chartData.length > 6 ? "800px" : "min(100%, 600px)" }}>
          <ResponsiveContainer width="100%" height={400} className="bg-dark">
            <BarChart data={chartData} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="expenses"
                fill="#FF5733"
                onClick={(bar) => {
                  setSelectedIndex(bar.payload.index);
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filtered Data */}
      <div className="container mt-3">
        <h3>Filtered Expenses:</h3>
        {filteredData.length > 0 ? (
          filteredData.map((expense, index) => (
            <button key={index} className="btn  w-100 m-2" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}>
              <h2 className="text-start">{expense.name}
                <h4 className="text-end">{">"}</h4>
              </h2>
              <h5 className="text-start">₹ {expense.amount}</h5>
            </button>
          ))
        ) : (
          <p className="text-center mt-2">No data available</p>
        )}
      </div>
    </>
  );
}