import React, { useState, useEffect } from "react";
import axios from "axios";
import PayAndPostJob from "./phanton"; // Your Phantom wallet component

export default function Profile() {
   const url='https://rizeos-backend-pwmw.onrender.com';
  const [role, setRole] = useState("jobseeker");
  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    jobRole: "",
    skills: "",
    experience: "",
    salary: "",
    description: "",
    file: null,
  });
  const [jobseekers, setJobseekers] = useState([]);
  const [hasRecruiterProfile, setHasRecruiterProfile] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (role === "recruiter" && email) {
      checkRecruiterPosted();
    }
  }, [role]);

  const checkRecruiterPosted = async () => {
    try {
      const res = await axios.get(`${url}/api/profile/recruiter/${email}`);
      setHasRecruiterProfile(res.data ? true : false);
    } catch (err) {
      setHasRecruiterProfile(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (role === "jobseeker") {
      try {
        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
          if (value) formData.append(key, value);
        });
        formData.append("roleType", role);
        formData.append("email", email);

        const res = await axios.post(`${url}/profile`, formData);
        alert("Jobseeker profile updated!");
        setForm( {
    name: "",
    contactNumber: "",
    jobRole: "",
    skills: "",
    experience: "",
    salary: "",
    description: "",
    file: null,
  });
      } catch (err) {
        console.error("Jobseeker profile failed:", err);
        alert("Failed to submit jobseeker profile");
      }
    } else {
      setFormSubmitted(true);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      formData.append("roleType", role);
      formData.append("email", email);

      const res = await axios.post(`${url}/profile`, formData);
      alert("Job posted successfully!");
      setHasRecruiterProfile(true);
      setFormSubmitted(false);
    } catch (err) {
      console.error("Job posting failed:", err);
      alert("Failed to post job");
    }
  };

  const fetchJobseekers = async () => {
    try {
      const res = await axios.get(`${url}/api/profile/jobseekers`);
      setJobseekers(res.data);
    } catch (err) {
      console.error("Failed to fetch jobseekers", err);
    }
  };

  const labels = {
    name: role === "jobseeker" ? "Your Name" : "Company Name",
    jobRole: role === "jobseeker" ? "Which Role You Want" : "Role to Hire",
    contactNumber: "Contact Number",
    skills: role === "jobseeker" ? "Skills You Have" : "Skills Required",
    experience: role === "jobseeker" ? "Experience You Have" : "Experience Required",
    salary: role === "jobseeker" ? "Expected Salary" : "Salary to be Given",
    description: role === "jobseeker" ? "About Yourself" : "Job Description",
    file: role === "jobseeker" ? "Upload Resume" : "Upload Brochure",
  };

  const renderFormFields = () =>
    ["name", "jobRole", "contactNumber", "skills", "experience", "salary", "description"].map((field, idx) => (
      <div className="mb-2" key={idx}>
        <label>{labels[field]}</label>
        {field === "description" ? (
          <textarea className="form-control" rows="4" name={field} value={form[field]} onChange={handleChange} />
        ) : (
          <input
            type={field === "contactNumber" ? "tel" : "text"}
            className="form-control"
            name={field}
            value={form[field]}
            onChange={handleChange}
          />
        )}
      </div>
    ));

  return (
    <div className="container py-4">
      {/* Email Header */}
      <div className="mb-4 text-center">
        <h5>Logged in as: {email}</h5>
      </div>

      {/* Role Toggle */}
      <div className="mb-3 text-center">
        <div className="btn-group">
          <input
            type="radio"
            className="btn-check"
            name="role"
            id="jobseeker"
            autoComplete="off"
            checked={role === "jobseeker"}
            onChange={() => setRole("jobseeker")}
          />
          <label className="btn btn-outline-primary" htmlFor="jobseeker">🎓 Job Seeker</label>

          <input
            type="radio"
            className="btn-check"
            name="role"
            id="recruiter"
            autoComplete="off"
            checked={role === "recruiter"}
            onChange={() => setRole("recruiter")}
          />
          <label className="btn btn-outline-primary" htmlFor="recruiter">🏢 Recruiter</label>
        </div>
      </div>

      {/* Recruiter View: Already Posted */}
      {role === "recruiter" && hasRecruiterProfile && (
        <div>
          <button className="btn btn-success mb-3" onClick={fetchJobseekers}>View Jobseekers</button>
          {jobseekers.length > 0 ? (
            <div className="list-group">
              {jobseekers.map((seeker, idx) => (
                <div key={idx} className="list-group-item">
                  <h5>{seeker.name}</h5>
                  <p><strong>Role:</strong> {seeker.jobRole}</p>
                  <p><strong>Skills:</strong> {seeker.skills}</p>
                  <p><strong>Experience:</strong> {seeker.experience}</p>
                  <p><strong>Salary:</strong> {seeker.salary}</p>
                  <p><strong>Description:</strong> {seeker.description}</p>
                  {seeker.filePath && (
                    <a href={`https://rizeos-backend-pwmw.onrender.com/${seeker.filePath}`} target="_blank" rel="noopener noreferrer">View Resume</a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No jobseekers yet</p>
          )}
        </div>
      )}

      {/* Recruiter View: Post Job */}
      {role === "recruiter" && !hasRecruiterProfile && (
        <>
          {!formSubmitted ? (
            <form className="bg-light p-4 rounded shadow-sm" onSubmit={handleSubmit} encType="multipart/form-data">
              <h5>Post a Job</h5>
              {renderFormFields()}
              <div className="mb-2">
                <label>{labels.file}</label>
                <input type="file" className="form-control" name="file" onChange={handleChange} />
              </div>
              <button className="btn btn-primary w-100">Next: Pay with Phantom</button>
            </form>
          ) : (
            <div className="bg-white p-4 mt-3 rounded shadow-sm">
              <h6 className="text-center">Please complete 0.01 SOL payment</h6>
              <PayAndPostJob onPaymentSuccess={handlePaymentSuccess} />
            </div>
          )}
        </>
      )}

      {/* Jobseeker View */}
      {role === "jobseeker" && (
        <form className="bg-light p-4 rounded shadow-sm" onSubmit={handleSubmit} encType="multipart/form-data">
          <h5>Update Jobseeker Profile</h5>
          {renderFormFields()}
          <div className="mb-2">
            <label>{labels.file}</label>
            <input type="file" className="form-control" name="file" onChange={handleChange} />
          </div>
          <button className="btn btn-primary w-100">Update Profile</button>
        </form>
      )}
    </div>
  );
}
