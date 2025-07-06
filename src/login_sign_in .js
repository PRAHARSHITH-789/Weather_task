import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

import { useNavigate } from 'react-router-dom';

function Login_in() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const getin = async () => {
    try {
      console.log("Form Submitted:", form);
      const response = await axios.post("http://localhost:8080/login", {
        email: form.email,
        password: form.password,
      });

      if (response.status === 200) {
        localStorage.setItem("email", response.data.user.email);
        localStorage.setItem("logged", "true");
        localStorage.setItem("token", response.data.token);

        window.alert(`Welcome Mr/Ms ${localStorage.getItem('email')}`);
        setUser({ email: "", password: "" });
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      alert("Failed to sign in. Please try again.");
    }
  };

  return (
    <div className="container shadow-xl p-4 border rounded-3 mt-5" style={{ width: "300px" }}>
      <center>
        <i className="bi bi-person-circle text-center" style={{ fontSize: "3rem", color: "blue" }}></i>
      </center>
      <h3 className="text-center">Welcome Back</h3>
      <h6 className="mb-3 text-center">Sign in to your account</h6>
      <form className="form">
        <label className="form-label">Enter your Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label className="form-label mt-2">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter your Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          className="btn btn-success mt-3 form-control"
          onClick={(e) => {
            e.preventDefault();
            getin();
          }}
        >
          Submit
        </button>
        <hr />
      </form>

      {!user ? (
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            setUser(decoded);
            form.email=user.email;

          try{
const response = await axios.post("http://localhost:8080/login", {
        email: form.email,
        
      });

            }catch{

            }
    
            console.log("Decoded User:", decoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      ) : (
        <div>
          <h4>Hello, {user.name}</h4>
          <img src={user.picture} alt="Profile" className="rounded-circle mt-2" width={100} />
          <p>{user.email}</p>
        </div>
      )}

      <p>
        If you don't have account? <a href="/sign_in">Sign in</a>
      </p>
    </div>
  );
}
 
function Sign_in() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sign = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    console.log("Form Submitted:", form);

    const response = await axios.post("http://localhost:8080/sign_in", {
      email: form.email,
      password: form.password,
    });

    if (response.status === 200) {
      localStorage.setItem("email", form.email);
      localStorage.setItem("logged", "true"); 
      window.alert(`Welcome Mr/Ms ${form.email}`);
      setForm({ email: "", password: "", confirmPassword: "" });
      navigate("/");
    }
  } catch (error) {
    console.error("Error signing in:", error);
    alert("Failed to sign in. Please try again.");
  }
};

  return (
    <div className="container shadow-xl p-4 border rounded-3 mt-5" style={{ width: "300px" }}>
      <center>
        <i className="bi bi-person-circle text-center" style={{ fontSize: "3rem", color: "blue" }}></i>
      </center>
      <h3 className="text-center">Welcome To JobChain</h3>
      <h6 className="mb-3 text-center">Create Your Account</h6>

      <form className="form">
        <label className="form-label">Email</label>
        <input name="email" value={form.email} onChange={handleChange} type="text" className="form-control" placeholder="Enter your Email" />
        
        <label className="form-label mt-2">Password</label>
        <input name="password" value={form.password} onChange={handleChange} type="password" className="form-control" placeholder="Enter your Password" />
        
        <label className="form-label mt-2">Confirm Password</label>
        <input name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" className="form-control" placeholder="Confirm your Password" />
        
        <button className="btn btn-success mt-3 form-control" onClick={sign}>Sign up</button>
        <hr />
      </form>

      {!user ? (
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            const decoded = jwtDecode(credentialResponse.credential);
            setUser(decoded);
            localStorage.setItem('username', decoded.name);
            localStorage.setItem('email', decoded.email);
            
            console.log("Decoded User:", decoded);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      ) : (
        <div>
          <h4>Hello, {user.name}</h4>
          <img src={user.picture} alt="Profile" className="rounded-circle mt-2" width={100} />
          <p>{user.email}</p>
        </div>
      )}

      <p>If you already have an account? <a href="/login">Login</a></p>
    </div>
  );
}


export  {Login_in,Sign_in};