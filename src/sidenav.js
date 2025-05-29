import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './sidenav.css';

export default function Sidenav() {
  const [activeIndex, setActiveIndex] = useState(0);

  const navbarItems = [
    { name: "Dashboard", icon: "bi-speedometer2" },
    { name: "Test", icon: "bi-clipboard-check" },
    { name: "Calendar", icon: "bi-calendar" },
    { name: "Statistics", icon: "bi-bar-chart-line" },
    { name: "Chat", icon: "bi-chat-dots" },
    { name: "Appointments", icon: "bi-calendar-check" },
    { name: "History", icon: "bi-clock-history" },
    { name: "Settings", icon: "bi-gear" },
    { name: "Support", icon: "bi-life-preserver" },
  ];

  return (
    <div className="sidenav">
      <h3 style={{ cursor: "pointer", color: 'white' }}>
        <i className="fas fa-stethoscope text-blue-600 me-2"></i>
        <b> HealthCare.</b>
      </h3>

      <h6 className="mt-4 text-light">General</h6>

      <ul className="list" style={{ listStyleType: "none", paddingLeft: 0 }}>
        {navbarItems.map((data, index) => (
          <li
            key={index}
            className={`my-1 d-flex align-items-center px-2 rounded ${
              index === activeIndex ? 'active' : ''
            }`}
            style={{
              cursor: "pointer",
              height: "50px",
              marginBottom: "10px",
            }}
            onClick={() => setActiveIndex(index)}
          >
            <i className={`${data.icon} me-2`}></i>
            {data.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
