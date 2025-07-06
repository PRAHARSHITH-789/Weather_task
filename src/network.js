import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './navbar';

export default function Network() {
  const [data, setData] = useState([]);
 const url=process.env.REACT_APP_API_URL;
  const share = () => {
    window.location.href = "/Your_Network/share_thought";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/network/posts`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid d-flex justify-content-between align-items-center mt-3">
        <h2 className="m-2">Listen! What your Network says...</h2>
        <button className="btn btn-info m-2" onClick={share}>
          Share Your Thoughts...
        </button>
      </div>

      <div className="container mt-3">
        <div className="row">
          {data.map((item, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="bg-light shadow rounded-3 p-3 d-flex h-100">
                <img
                  src=""
                  className="rounded-3 me-3"
                  style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                  
                />
                <div>
                  <h5 className="fw-bold">{item.name}</h5>
                  <p className="fst-italic mb-1">{item.position}</p>
                  <p>{item.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="m-0"><i className="bi bi-geo-alt"></i> {item.location}</p>
                    <span className="btn btn-outline-info btn-sm rounded-pill">View →</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
