import React, { useState } from 'react';
import './Dashboard.css';
import HumanBody from './Humanbody';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalender.css';

export default function Dashboard({ showMainContent = true, showCalendar = true }) {
  const [date, setDate] = useState(new Date());

  const items = [
    { icon: 'fa fa-user text-info', name: 'Patients', value: '126', result: 'fas fa-arrow-trend-up text-success' },
    { icon: 'fas fa-stethoscope text-success', name: 'Doctors', value: '32', result: 'fas fa-arrow-trend-down text-danger' },
    { icon: 'bi-calendar-check text-info', name: 'A.ments', value: '58', result: 'fas fa-arrow-trend-up text-success' },
    { icon: 'fas fa-dollar-sign text-warning', name: 'Revenue', value: '$12.3k', result: 'fas fa-arrow-trend-up text-success' },
  ];

  const recent = [
    { icon: "fas fa-lungs", name: "Lung Infection", data: "Cough, fever for 4 days", result: "Alert", color: "danger" },
    { icon: "fas fa-tooth", name: "Tooth Pain", data: "Reported by 2 patients", result: "Caution", color: "warning" },
    { icon: "fas fa-allergies", name: "Cold", data: "Seasonal Cold", result: "Normal", color: "success" },
    { icon: "fas fa-brain", name: "Headache", data: "Patient facing severe pain", result: "Alert", color: "danger" },
  ];

  const  todayact=[{bgc:"skyblue",task:"General Checkup",time:"9:00 -9:30 AM", status:"pending"},
    {bgc:"lightgreen",task:"ward visit",time:"9:30 -10:30 AM", status:"conformied"},
    {bgc:"orange",task:"New OP visit",time:"11:00 -12:30 AM", status:"waiting"}
  ]
  const  appoint=[{ logo:" fa fa-tooth",task:"Dentist meet",time:"15 June", status:"pending"},
    { logo:" fa fa-hearth",task: "Cardologist consult",time:"17 June", status:"conformied"},
    { logo:"fa fa-lungs",task:"pharmology meet",time:"19 June", status:"waiting"}
  ]
  return (
    <div className="container-fluid p-0">
      <div className="row">
        {showMainContent && (
          <div className="col-md-8">
            <h1 className="mb-4">Dashboard</h1>
            <h6 className="badge bg-info mb-3">Overview</h6>
            <div className="d-flex flex-wrap">
              {items.map((data, index) => (
                <div key={index} className="card-hover-effect p-3 m-3 rounded shadow-sm bg-skyblue" style={{ width: '200px' }}>
                  <h4><i className={`${data.icon} me-2`}></i>{data.name}</h4>
                  <h5>{data.value}<i className={`${data.result} ms-2`}></i></h5>
                </div>
              ))}
            </div>

            <b className="d-flex mt-4">Recent Health Alerts</b>
            <h4 className="badge bg-danger mb-3">Live</h4>
            <div className="d-flex flex-wrap">
              {recent.map((data, index) => (
                <div key={index} className="rounded shadow-lg p-3 bg-light m-2" style={{ width: '280px' }}>
                  <h5><i className={`${data.icon} me-2 text-${data.color}`}></i>{data.name}</h5>
                  <h6>{data.data} <span className={`text-${data.color}`}><i className="fa fa-exclamation-triangle ms-1"></i> {data.result}</span></h6>
                </div>
              ))}
            </div>
            <div className='shadow-sm '> 
              <h3>Appointments</h3>
              <div>{
              appoint.map((data)=>
              <div className='w-100 p-1  m-2   align-items-center justify-content-between rounded shadow-sm ' style={{backgroundColor:`whitesmoke`,height:"5%"}}><h4><i className={`${data.logo} m-3`}></i>{data.task}<span className={`badge m-1 bg-${data.status=="waiting"?"warning":"success"} `} style={{fontSize:'10px'}}>{data.status} </span> </h4>
          <h6>{data.time}</h6>
            </div>)}
          </div></div>
          </div>
        )}

        <div className="col-md-4">
          {showMainContent && (
            <div className="mt-3 shadow-lg p-3 mb-4">
              <h3>Patient Anatomy</h3>
              <h4 className="badge bg-success mb-2">Healthy</h4>
              <HumanBody />
            </div>
          )}
          {showCalendar && (
            <div className="p-3 shadow-sm bg-light rounded">
              <h4>Select Date:</h4>
              <Calendar onChange={setDate} value={date} />
              <p className="mt-3">Selected Date: <strong>{date.toDateString()}</strong></p>
            </div>
          )}
<div className='w-100  shadow-sm '>
<h3>Upcoming Schedule</h3><h4 className="badge bg-success mb-3  ">Today</h4>
{todayact.map((data)=>
          <div className='w-100  text-center p-1  m-2  rounded shadow-sm ' style={{backgroundColor:`${data.bgc}`,height:"5%"}}><h4>{data.task}<span className={`badge m-1 bg-${data.status=="waiting"?"warning":"success"} `} style={{fontSize:'10px'}}>{data.status} </span> </h4>
          <h6>{data.time}</h6>
          
          </div>)}
        </div>
</div>


      </div>
    </div>
  );
}
