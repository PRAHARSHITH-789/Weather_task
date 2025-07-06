import {React,useState,useEffect} from 'react';
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";

import "./navbar.css";
import { href, useNavigate } from 'react-router-dom';
export default function Navbar() { 
const [user,setuser]=useState({email:"",username:""})
   const navigate=useNavigate();

   const [logged,setlogged]=useState(false);
const go=(path)=>{

navigate(path);

}

useEffect(() => {
  const timer = setTimeout(() => {
    setuser({
      email: localStorage.getItem('email') || "",
      username: localStorage.getItem('username') || "",
    });

    setlogged(localStorage.getItem('logged') === 'true'); // ensure it's boolean
  }, 2000);

  return () => clearTimeout(timer);
}, []);
 
const checklog=()=>{
if(!localStorage.getItem('logged')){

window.location.href='/login';
}

 }
const logout = () => {
  localStorage.removeItem('email');
  localStorage.removeItem('username');
  localStorage.setItem('logged', false);
  console.log(localStorage.getItem('logged'));

  setlogged(false);
  setuser({ email: "", username: "" });
};


const [walletAddress, setWalletAddress] = useState(null);

  const connectPhantom = async () => {
    if ('solana' in window) {
      const provider = window.solana;

      if (provider.isPhantom) {
        try {
          const res = await provider.connect();
          const pubKey = res.publicKey.toString();
          console.log("Connected Wallet:", pubKey);
          setWalletAddress(pubKey);
        } catch (err) {
          console.log("User closed Phantom");
        }
      }
    } else {
      alert("Please install Phantom Wallet");

      setTimeout(() => {
window.open("https://www.phantom.app", "_blank");
}, 1000);

    }
  };

return (<>


<div className="container-fluid shadow p-2  navbar navbar-expand-lg bg-light border mb-2">
<div className="d-flex align-items-center">
<i className="bi bi-briefcase" style={{ fontSize: '2rem', color: 'blue' }}></i>
<a className="navbar-brand    ms-2 h2" href='' onClick={()=>go("/")}>JobChain</a>
</div>

<ul className="navbar-nav me-auto navlap ">
<li className="nav-item mx-2">
<a className="nav-link" onClick={()=>go("/jobs")} href="">Jobs</a>
</li>
<li className="nav-item mx-2">
<a className="nav-link"  onClick={()=>go("/Your_Network")}href="">Network</a>
</li>
<li className="nav-item mx-2">
<a className="nav-link" onClick={()=>go("/Post_Job")} href="">Post Jobs</a>
</li>
<li className="nav-item mx-4">
<div className="input-group mx-3">
  <span className="input-group-text bg-white border-end-0">
    <i className="bi bi-search"></i>
  </span>
  <input
    type="text"
    className="form-control border-start-0"
    placeholder="Search Jobs, Skils..."
  />
</div>
</li>


<li className="nav-item mx-2">
  <li className="nav-link" onClick={connectPhantom}>
    <i className='bi bi-wallet-fill mx-2 text-success' />
    {walletAddress ? 'Connected' : 'Connect Wallet'}
  </li>
</li>

</ul>

{!logged ?<ul className="nav ">
<li className="nav-item text-dark ">
<a className="nav-link" onClick={()=>go("/sign_in")} href=""><i className="bi bi-person-circle me-1" ></i> <span className="nav-tex"> Sign Up</span></a>
</li>
<li className="nav-item  text-dark">
<a className="nav-link"  onClick={()=>go("/login")} href=""><i className="bi bi-box-arrow-in-right me-1" ></i> <span className="nav-text">Login</span></a>
</li>
</ul>
: <ul className="nav "><li className="nav-item text-dark ">
<a className="nav-link" href="" onClick={()=>go('/Profile')}><i className="bi bi-person-circle me-1" ></i> <span className="nav-tex">{localStorage.getItem('email')}</span></a>
</li>
<li className="nav-item text-dark ">
<p className="nav-link "   onClick={logout}> <span className="nav-tex">{"Logout"} </span><i className="bi bi-box-arrow-right me-1" /></p>
</li> </ul>}

</div>
<div>
<div className="slap" >
  <input className="form-control " placeholder="Search jobs, Skils..."  /></div>

<div className='mt-1 slap'>
<li className="btn  btn-info mx-1"  onClick={()=>go("/jobs")}>jobs</li>
<li className="btn  btn-info mx-1" onClick={()=>go("/Your_Network")}>Network</li>
<li className="btn  btn-info mx-1 " onClick={()=>go("/Post_job")}>Post Jobs</li>
<li className="btn  btn-success mx-1 " onClick={connectPhantom}>
  ₹

Wallet</li>
</div>
</div>

</>
);
}

