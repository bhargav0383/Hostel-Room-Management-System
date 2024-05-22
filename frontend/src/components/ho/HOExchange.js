import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HOExchange = () => {
    const [mutualRequests, setMutualRequests] = useState([]);

    useEffect(() => {
        fetchMutualRequests();
    }, []);

    const fetchMutualRequests = () => {
        axios.get(`http://localhost:5000/roomexchange_approval`)
            .then(response => {
                console.log(response.data);
                setMutualRequests(response.data);
            })
            .catch(error => {
                console.error('Error fetching room exchange approval:', error);
            });
    }

    const handleApprove = (index) => {
        const [request1, request2] = mutualRequests[index];
        const req1id = request1.id;
        const req2id = request2.id;
        const req1from = request1.room_number_from;
        const req2from = request2.room_number_from;

        axios.post(`http://localhost:5000/roomexchange_approval`, { req1id, req2id, req1from, req2from })
            .then(response => {
                console.log(response.data);
                // Refetch the data after approval
                fetchMutualRequests();
            })
            .catch(error => {
                console.error('Error approving room exchange:', error);
            });
    }

    return (
        <div className="container">
            <h2 className="text-center mb-4">Room Exchange Requests</h2>
            {mutualRequests.length === 0 ? (
                <div className="alert alert-info text-center mx-auto my-3 w-50" role="alert">
                    No mutual requests available.
                </div>
            ) : (
                mutualRequests.map((pair, index) => (
                    <div key={index} className="row justify-content-center align-items-center mb-4">
                        <div className="row ">
                            <div className="col-md-5">
                                <div className="card mb-4">
                                    <div className="card-header text-center">
                                        <h5>{pair[0]?.id}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p><strong>From:</strong> {pair[0]?.room_number_from}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>To:</strong> {pair[0]?.room_number_to}</p>
                                            </div>
                                        </div>
                                        <p><strong>Description:</strong> {pair[0]?.room_exchange_description}</p>
                                    </div>
                                    <div className="card-footer text-end">
                                        <p>Raised at {new Date(pair[0]?.created_time).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 d-flex justify-content-center align-items-center">
                                <button className="btn btn-success btn-lg btn-approve" onClick={() => handleApprove(index)}>Approve</button>
                            </div>
                            <div className="col-md-5">
                                <div className="card">
                                    <div className="card-header text-center">
                                        <h5>{pair[1]?.id}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p><strong>From:</strong> {pair[1]?.room_number_from}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>To:</strong> {pair[1]?.room_number_to}</p>
                                            </div>
                                        </div>
                                        <p><strong>Description:</strong> {pair[1]?.room_exchange_description}</p>
                                    </div>
                                    <div className="card-footer text-end">
                                        <p>Raised at {new Date(pair[1]?.created_time).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

export default HOExchange;
