import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          throw new Error("No token found"); 
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const userId = decodedToken._id;

        const res = await axios.get(`http://localhost:8000/api/v1/auth/dashboard/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched data:", res.data); 
        setData(res.data.user); 
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        navigate("/login"); 
      }
    };

    fetchData();
  }, [navigate]);

  const containerStyle = {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    maxWidth: "600px",
    margin: "30px auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const headerStyle = {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  };

  const listStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const listItemStyle = {
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-between",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#555",
  };

  const valueStyle = {
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Dashboard</h2>
      {data ? (
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <span style={labelStyle}>Name:</span>
            <span style={valueStyle}>{data.name}</span>
          </li>
          <li style={listItemStyle}>
            <span style={labelStyle}>Email:</span>
            <span style={valueStyle}>{data.email}</span>
          </li>
          <li style={listItemStyle}>
            <span style={labelStyle}>Phone No:</span>
            <span style={valueStyle}>{data.phone}</span>
          </li>
          <li style={listItemStyle}>
            <span style={labelStyle}>Address:</span>
            <span style={valueStyle}>{data.address}</span>
          </li>
          <li style={listItemStyle}>
            <span style={labelStyle}>Role:</span>
            <span style={valueStyle}>
              {data.role === 0 ? "Student" : "Admin"} 
            </span>
          </li>
        </ul>
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
