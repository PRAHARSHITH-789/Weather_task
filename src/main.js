import React from 'react';
import Sidenav from './sidenav';
import Header from './header';
import Dashboard from './Dashboard';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './sidenav.css';

export default function Main() {
  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <div style={{ width: '24%'  ,overflowY:'hidden'}}>
        <Sidenav />
      </div>
      <div style={{ width: '78%', overflowY: 'auto', height: '100vh' }}>
        <Header />
        <div className="p-3">
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
