import React, { useEffect, useState } from 'react';
import axios from './axios';

function TicketDetails() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const retrieved_data = localStorage.getItem("selectedTicket");
        const ticket = JSON.parse(retrieved_data);
        setTickets(ticket);
    }, []);

    const handleSolveClick = () => {
        if (tickets.ticket_status === 0) {
            const reply_typed = prompt("Please enter your reply");
            if (reply_typed === "") {
                alert("Please enter a reply");
            } else if (reply_typed !== null) {
                axios.put(`http://localhost:5000/tickets_hr/${tickets.id}`, {
                    reply: reply_typed,
                    tag: tickets.tag
                }).then((response) => {
                    console.log(response);
                    alert("Problem solved successfully");
                    window.location.href = '/hr';
                });
            }
        }
    }

    const handleFilterClick = () => {
        const confirmed = window.confirm('Are you sure you want to filter this ticket?');
        if (confirmed) {
            axios.put(`http://localhost:5000/tickets_hr/${tickets.id}`, { filtered: "true", tag: tickets.tag }).then((response) => {
                console.log(response);
                alert('Ticket filtered successfully.');
                window.location.href = '/hr';
            });
        }
    }

    const getTagName = (tag) => {
        switch (tag) {
            case 'lift':
                return 'Lift';
            case 'washing_machine':
                return 'Washing Machine';
            case 'water_filter':
                return 'Water Filter';
            case 'bathroom':
                return 'Bathroom';
            case 'housekeeping':
                return 'House Keeping';
            case 'lan_status':
                return 'LAN Status';
            case 'electrical':
                return 'Electrical';
            case 'furniture':
                return 'Furniture';
            case 'civil_complaints':
                return 'Civil Complaints';
            case 'pest_control':
                return 'Pest Control';
            case 'green_office':
                return 'Green Office';
            default:
                return '';
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <div className="w-50">
                    <h2 className='text-center mb-3'>Ticket Details</h2>
                    <div className="card bg-light">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <span className={`badge bg-info`}>{tickets.id}</span>
                                <span className={`badge bg-dark`}>{getTagName(tickets.tag)}</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title text-center">{tickets.title}</h5>
                            <p className="card-text"><strong>Description: </strong> {tickets.ticket_description}</p>
                            <p className="card-text"><strong>File Upload: </strong>
                                <a href={`http://localhost:5000/uploads/${tickets.file_upload}`} target="_blank" rel="noopener noreferrer" className="ms-2">
                                {tickets.file_upload}
                                </a>
                            </p>
                            <p className="card-text"><strong>Raised Time: </strong>
                                {new Date(tickets.raised_time).toLocaleString('en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric',
                                    timeZoneName: 'short'
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button type="button" className="btn btn-success me-2" onClick={handleSolveClick}>Solve</button>
                        <button type="button" className="btn btn-danger" onClick={handleFilterClick}>Filter</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketDetails;
