import React, { useState } from 'react';

export default function Header() {
  const options = [
    { value: 'praharshith', label: 'Dr. Praharshith' },
    { value: 'siddhu', label: 'Dr. Siddhu' },
    { value: 'sathish', label: 'Dr. Sathish' },
    { value: 'logout', label: 'LogOut' },
  ];

  const [selected, setSelected] = useState('praharshith');

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    if (value === 'logout') {
      alert('Logging out...');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between p-2 shadow-sm"
      style={{
        backgroundColor: '#f8f9fa',
        height: '60px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
      }}
    >
      <h4 className="m-0">HealthCare.</h4>
      <input
        placeholder="Search patient, Appointments"
        style={{ width: '40%' }}
        className="form-control mx-2"
      />
      <button className="btn btn-info mx-2">+ADD</button>
      <i className="fa fa-bell text-dark me-3"></i>
      <i className="fa fa-user-circle text-dark fs-4 me-2"></i>
      <select
        id="doctor-select"
        className="form-select"
        value={selected}
        onChange={handleChange}
        style={{ width: '200px' }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
