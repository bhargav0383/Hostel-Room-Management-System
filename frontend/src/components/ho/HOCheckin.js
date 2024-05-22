import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HOCheckin = () => {
  const [checkinApproval, setCheckinApproval] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error_for, setError_for] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/checkin_approval`)
      .then(response => {
        console.log(response.data);
        setCheckinApproval(response.data);
      })
      .catch(error => {
        console.log(error);
        setError_for('Error fetching checkin approval. Please try again later.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleApprove = (id, start_time_formatted) => {
    console.log('Approving checkin:', id, start_time_formatted);
    axios.post(`http://localhost:5000/checkin_approval/approve`, { id, start_time_formatted })
      .then(response => {
        setCheckinApproval(checkinApproval.filter(checkin => checkin.id !== id));
      })
      .catch(error => {
        setError_for('Error approving checkin. Please try again later.');
      });
  }

  return (
    <div className="container">
      <h2 className="text-center mb-3">Check In/Out Requests</h2>
      {error_for && <div className="alert alert-danger">{error_for}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : checkinApproval.length === 0 ? (
        <div className="alert alert-info text-center mx-auto my-3 w-50">No check-in approvals available.</div>
      ) : (
        <div className="row justify-content-center">
          {checkinApproval.map((checkin, index) => (
            <div key={index} className="col-lg-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center">{checkin.title}</h5>
                  <p className="card-text"><strong>Reason: </strong> {checkin.reason}</p>
                  <p className="card-text"><strong>Student ID: </strong> {checkin.id}</p>
                  <p className="card-text"><strong>Start Time: </strong> {new Date(checkin.start_time_formatted).toLocaleString()}</p>
                  <p className="card-text"><strong>End Time: </strong> {new Date(checkin.end_time_formatted).toLocaleString()}</p>
                  <a href={`http://localhost:5000/${checkin.file_upload}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">See proof</a>
                </div>
                <div className='card-footer d-flex justify-content-center'>
                    <button onClick={() => handleApprove(checkin.id, checkin.start_time_formatted)} className="btn btn-success w-25">Approve</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HOCheckin;
  