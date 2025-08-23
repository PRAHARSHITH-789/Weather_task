import React, { useState } from 'react';
import axios from 'axios';

export default function Share_thought_form() {
   const url="https://rizeos-backend-pwmw.onrender.com";
  const [form, setForm] = useState({
    name: '',
    position: '',
    location: '',
    description: '',
    email:localStorage.getItem('email')
  });

  const labels = {
    description: "Description",
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    
    try {
      const res = await axios.post(`${url}/network/post`, form);
      if (res.status === 201) {
        window.location.href = "/Your_Network"
      }
    } catch (err) {
      console.error("Submission failed:", err);
      alert("Failed to submit the form");
    }
  };

  return (
    <div className="container py-4">
      <form
        className="bg-light p-4 rounded shadow-sm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h5>Share Your Thoughts</h5>

        <div className="mb-2">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>Position</label>
          <input
            type="text"
            className="form-control"
            name="position"
            value={form.position}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>Location</label>
          <input
            type="text"
            className="form-control"
            name="location"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label>{labels.description}</label>
          <textarea
            className="form-control"
            rows="4"
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}
