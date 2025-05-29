import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MyCalender.css'; // Custom styles
export default function MyCalendar() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="m-4">
      <h3>Select Date:</h3>
      <Calendar onChange={setDate} value={date} style={{width:"2000px"}}
       />
      <p className="mt-2">Selected Date: {date.toDateString()}</p>
    </div>
  );
}
