import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate} from "react-router-dom";

export default function AddExp() {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    date: "",
    reference: "",
    file: null,
  });

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData for file uploads
    const data = new FormData();
    data.append("name", formData.name);
    data.append("amount", formData.amount);
    data.append("date", formData.date);
    data.append("reference", formData.reference);
    if (formData.file) {
      data.append("file", formData.file);
    }

    try {
      const response = await axios.post("http://localhost:8080/add-expense", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response:", response.data);
      alert("Expense Added Successfully!");

      // Clear Form After Submission
      setFormData({
        name: "",
        amount: "",
        date: "",
        reference: "",
        file: null,
      });

    } catch (error) {
      console.error("Error submitting expense:", error);
      alert("Failed to add expense!");
    }
  };

  const home=()=>{
    navigate("/");
  }
  return (
    <div className="container w-75 p-3" style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px" }}>
      <form className="container" onSubmit={handleSubmit}>
        <h2 className="text-center text-danger">ADD EXPENSES</h2>
        <br />

        <label>Name Of The Expense</label>
        <input
          type="text"
          className="form-control"
          required
          placeholder="EX: Drinking Water"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />

        <label>Amount Of The Expense</label>
        <input
          type="text"
          className="form-control"
          required
          placeholder="Ex: ₹ 30000"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <br />

        <label>Date Of The Expense</label>
        <input
          type="date"
          className="form-control"
          required
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <br />

        <label>Ref/Trans Of The Expense</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ex: AR230RE35F2"
          name="reference"
          value={formData.reference}
          onChange={handleChange}
        />

        <br />

        <label>Upload file</label>
        <input type="file" className="form-control" onChange={handleFileChange} />

        <br />

        {/* Buttons */}
        <button type="reset" onClick={home} className="btn btn-danger m-3">
          Cancel
        </button>
        <button type="submit" className="btn btn-success m-3">
          Submit
        </button>
      </form>
    </div>
  );
}
