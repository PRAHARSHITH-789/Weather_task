import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './navbar.js';

export default function Jobs() {

  const url=process.env.REACT_APP_API_URL;
  const [jobs, setJobs] = useState([]);
  const [appliedIds, setAppliedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = localStorage.getItem('email');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.post(`${url}/recommend/jobs`, {
          email,
        });

        if (res.status === 200 && res.data.recommended_jobs) {
          setJobs(res.data.recommended_jobs);
        } else {
          setError('No matching jobs found.');
        }

        const appliedRes = await axios.post(`${url}/apply/check`, {
          email,
        });
        if (appliedRes.data.applied) {
          setAppliedIds(new Set(appliedRes.data.applied));
        }
      } catch (err) {
        setError('Something went wrong Please update your profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [email]);

  const handleApply = async (jobId) => {
    try {
      const res = await axios.post(`${url}/apply/apply`, {
        email,
        jobId,
      });

      if (res.status === 200) {
        setAppliedIds((prev) => new Set(prev).add(jobId));
      } else {
        alert(res.data.message || 'Already applied.');
      }
    } catch (err) {
      alert('Error applying to job.');
    }
  };

  return (
    <>
      <Navbar />
      <h3 className="text-start m-3">Recommended Jobs Based on Your Profile</h3>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3">Waiting for job recommendations (ML processing)...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center my-4">{error}</div>
      ) : (
        <div className="row px-3">
          {jobs.map((item, idx) => (
            <div key={idx} className="col-md-6 mb-4">
              <div className="bg-light shadow rounded-3 row p-3" style={{ width: 520 }}>
                <img
                  src="google.webp"
        alt="logo"
                  className="rounded-3 col-sm-4 p-2"
          style={{ width: 70, height: 70 }}
                />
                <div className="col-sm-8">
       <h5>{item.jobRole}</h5>
                  <p className="text-muted">{item.name || 'Company Name'}</p>
                  {item.skills_required?.split(',').map((s, i) => (
                    <span key={i} className="badge bg-success m-1">{s.trim()}</span>
         ))}
                  <div className="d-flex justify-content-between mt-2">
                    <small>{item.location || 'Remote'}</small>
            {appliedIds.has(item._id) ? (
                      <button className="btn btn-success btn-sm" disabled>
                 Applied
                      </button>
        ) : (
                      <button
         className="btn btn-outline-info btn-sm"
         
      onClick={() => handleApply(item._id)}
        >
                        Apply
    </button>
                    )}
                  </div>
          </div>
              </div>
    </div>
          ))}
        </div>
      )}
    </>
  );
}
