import React from "react";
import { useNavigate } from "react-router-dom";
import "./duagle.css"
export default function Duagle(){
  const navigate=useNavigate();
 const go=(path)=>{
navigate(path);
 }
const checklog=(path)=>{
  if(!localStorage.getItem('logged')){
    window.location.href="/sign_in";
  }
  else{
    go(path);
  }
}
    return(<>
<div className="bg-info  p-5 w-100 h-50 text-center  text-light mt-2">
<h1>The Next Generation of  <span className="text-warning">Jobs</span></h1>
<p>Connect  Top Talent,Post  Jobs with Payments  and Bulid <br/> Your Professional Networks</p>

<button className="btn btn-light mx-2" onClick={()=>checklog('/jobs')}><i className="bi bi-search p-2" />Find jobs</button>
<button className="btn btn-info border" onClick={()=>checklog('/profile')}>+ Post a Job</button>

</div>

<div className="shadow container-fluid row  mainjobs  mt-3">


    <h3 className='text-center '>
        Lastest Oppurnities</h3>
        <p className="text-center">Discover Your Next move</p>
<div className="d-flex justify-content-end  px-4">

  <button className="btn bg-dark text-light rounded-5" onClick={()=>checklog('/jobs')} >
    View More →
  </button>
</div>




    <span className="bg-light row   shadow rounded-3" style={{width:"520px"}}>
       
<img src ="google.webp"  className="rounded-3  col-sm-4 p-2 " style={{width:'70px',height:"70px"}}/>
<div
className="col-sm-8 ">
<li  type="none" style={{fontSize:"2rem",fontStyle:"bold"}}>Front-End Developer</li>
<li  type="none" style={{fontStyle:"italic"}}>Google</li>

  <span class="badge bg-success  m-1 rounded-pill">React</span>
  <span class="badge bg-success m-1  rounded-pill">Html</span>
  <span class="badge bg-success  m-1 rounded-pill">Bootstrap</span>
<div className="d-flex justify-content-between align-items-start">
  <p className="m-2">

    <i className="bi bi-geo-alt mt-2"></i>Hyderabad
  </p>
  <p className="btn border-info text-info w-50 rounded-5" onClick={()=>checklog('/jobs') }>Apply    →</p>
</div>
</div>

  

    </span>
  
   
    <span className="bg-light row    mt-2 shadow rounded-3" style={{width:"520px"}}>
       
<img src ="google.webp"  className="rounded-3  col-sm-4 p-2 " style={{width:'70px',height:"70px"}}/>
<div
className="col-sm-8 ">
<li  type="none" style={{fontSize:"2rem",fontStyle:"bold"}}>Backend Developer</li>
<li  type="none" style={{fontStyle:"italic"}}>Google</li>

  <span class="badge bg-success  m-1 rounded-pill">Express</span>
  <span class="badge bg-success m-1  rounded-pill">Node js</span>
  <span class="badge bg-success  m-1 rounded-pill">MongoDB</span>
<div className="d-flex justify-content-between align-items-start">
  <p className="m-2">

    <i className="bi bi-geo-alt mt-2"></i>Hyderabad
  </p>
  <p className="btn border-info text-info w-50 rounded-5" onClick={()=>checklog('/jobs') } >Apply    →</p>
</div>
</div>

  

    </span>
     <span className="bg-light row mt-2  shadow rounded-3" style={{width:"520px"}}>
       
<img src ="google.webp"  className="rounded-3  col-sm-4 p-2 " style={{width:'70px',height:"70px"}}/>
<div
className="col-sm-8 ">
<li  type="none" style={{fontSize:"2rem",fontStyle:"bold"}}>Front-End Developer</li>
<li  type="none" style={{fontStyle:"italic"}}>Google</li>

  <span class="badge bg-success  m-1 rounded-pill">React</span>
  <span class="badge bg-success m-1  rounded-pill">Html</span>
  <span class="badge bg-success  m-1 rounded-pill">Bootstrap</span>
<div className="d-flex justify-content-between align-items-start">
  <p className="m-2">

    <i className="bi bi-geo-alt mt-2"></i>Hyderabad
  </p>
  <p className="btn border-info text-info w-50 rounded-5" onClick={()=>checklog('/jobs') } >Apply    →</p>
</div>
</div>

  

    </span>
  
   
    <span className="bg-light row    mt-2 shadow rounded-3" style={{width:"520px"}}>
       
<img src ="google.webp"  className="rounded-3  col-sm-4 p-2 " style={{width:'70px',height:"70px"}}/>
<div
className="col-sm-8 ">
<li  type="none" style={{fontSize:"2rem",fontStyle:"bold"}}>Backend Developer</li>
<li  type="none" style={{fontStyle:"italic"}} >Google</li>

  <span class="badge bg-success  m-1 rounded-pill">Express</span>
  <span class="badge bg-success m-1  rounded-pill">Node js</span>
  <span class="badge bg-success  m-1 rounded-pill">MongoDB</span>
<div className="d-flex justify-content-between align-items-start">
  <p className="m-2">

    <i className="bi bi-geo-alt mt-2"></i>Hyderabad
  </p>
  <p className="btn border-info text-info w-50 rounded-5"  onClick={()=>checklog('/jobs') }>Apply    →</p>
</div>
</div>

  

    </span>

  
</div>
  <div className="  p-5 w-100 h-50 text-center  text-light mt-2" style={{backgroundColor:"lightsteelblue"}}>
<h1>Update Your  <span className="text-warning">Profile</span></h1>
<p>To Get More Recommendations <br/>Bulid Your Career</p>

<button className="btn btn-light mx-2" onClick={()=>checklog('/Profile')}><i className="bi bi-mark p-2"/>Update</button>
<button className="btn btn-info border" onClick={()=>checklog('/Profile')}>+ Post a Job</button>

</div>
<div className="shadow container-fluid row  mainjobs  mt-3">


    <h3 className='text-center '>
        Network Updates</h3>
        <p className="text-center">Listen to know More</p>
<div className="d-flex justify-content-end  px-4">

  <button className="btn bg-dark text-light rounded-5" onClick={()=>checklog('/Your_Network')}>
    View More →
  </button>
</div>




    <span className="bg-light row   shadow rounded-3" style={{width:"520px"}}>
       
<img src ="Sundar_pichai.webp"  className="rounded-3  col-sm-4 p-2 " style={{width:'70px',height:"70px"}}/>
<div
className="col-sm-8 ">
<li  type="none" style={{fontSize:"2rem",fontStyle:"bold"}}>Mr. Sundar Pichai</li>
<li  type="none" style={{fontStyle:"italic"}}> CEO Of Google</li>

  <p>The most important metric … is how much has our engineering velocity increased … The company estimates that it’s so far seen a 10% boost.</p>
<div className="d-flex justify-content-between align-items-start">
  <p className="m-2">

    <i className="bi bi-geo-alt mt-2"></i>NewYork
  </p>
  <p className="btn border-info text-info w-50 rounded-5" onClick={()=>checklog('/Your_Network') }>View   →</p>
</div>
</div>

  

    </span>
  
   
    <span className="bg-light row    mt-2 shadow rounded-3" style={{width:"520px"}}>
       
<img src ="bill_gates.webp"  className="rounded-3  col-sm-4 p-2 " style={{width:'70px',height:"70px"}}/>
<div
className="col-sm-8 ">
<li  type="none" style={{fontSize:"2rem",fontStyle:"bold"}}>Bill Gates</li>
<li  type="none" style={{fontStyle:"italic"}}>FOunder of Microsoft</li>

  <p>It’s very profound and even a little bit scary — because it’s happening very quickly, and there is no upper bound</p>
<div className="d-flex justify-content-between align-items-start">
  <p className="m-2">

    <i className="bi bi-geo-alt mt-2"></i>London
  </p>
  <p className="btn border-info text-info w-50 rounded-5" onClick={()=>checklog('/Your_Network') } >View    →</p>
</div>
</div>

  

    </span>
     
   </div>
   <footer className="bg-dark text-light h-25 py-4 mt-2">
  <div className="container-fluid  mt-4">
    <div className="row">
   
      <div className="col-md-4 mb-3  mb-md-0">
        <h5>JobChain</h5>
        <p className="small">Innovating your digital future.</p>
      </div>

      
      <div className="col-md-4 mb-3 mb-md-0">
        <h6>Quick Links</h6>
        <ul className="list-unstyled">
          <li><a href="#" className="text-light text-decoration-none" onClick={()=>checklog('/') }>Home</a></li>
          <li><a href="#" className="text-light text-decoration-none" onClick={()=>checklog('/jobs') }>Jobs</a></li>
          <li><a href="#" className="text-light text-decoration-none" onClick={()=>checklog('/Your_Network') }>Network</a></li>
          <li><a href="#" className="text-light text-decoration-none" >Wallet</a></li>
          <li><a href="#" className="text-light text-decoration-none" onClick={()=>checklog('/Profile') }>Post Jobs</a></li>

        </ul>
      </div>

      <div className="col-md-4">
        <h6>Contact</h6>
        <p className="mb-1"><i className="bi bi-geo-alt-fill me-2"></i>Vizag, India</p>
        <p className="mb-1"><i className="bi bi-envelope-fill me-2"></i>siddhu.vakkapatla@gmail.com</p>
        <p><i className="bi bi-telephone-fill me-2"></i>+91 78934 62322</p>
      </div>
    </div>

 
    <hr className="border-light" />
    <div className="text-center">
      <small>© 2025 JobChain. All rights reserved.</small>
    </div>
  </div>
</footer>

</> );
}