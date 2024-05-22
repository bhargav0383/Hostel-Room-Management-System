import React, { useEffect, useState } from 'react';
import axios from './axios';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function DisplayTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState('all');

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
            case 'house_keeping':
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

    useEffect(() => {
        var hostelBlock = localStorage.getItem("hostel_block");
        axios.get(`http://localhost:5000/tickets_hr/${hostelBlock}`)
            .then((response) => {
                setTickets(response.data);
                setLoading(false);
            });
    }, []);

    const filterTicketsByTag = (tag) => {
        setSelectedTag(tag);
    };

    const filteredTickets = selectedTag === 'all' ? tickets : tickets.filter(ticket => ticket.tag === selectedTag);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (tickets.length === 0) {
        return  <>
                    <h2 className="text-center">Block Tickets</h2>
                    <div className='alert alert-warning text-center mx-auto my-3 w-50'>
                        <h5> No tickets to show. All Tickets are Solved!! </h5>
                    </div>
                </>;
    }

    return (
      <>  
            <h2 className="text-center">Block Tickets</h2>
          <div className='container'>
            <div className="dropdown mb-3 d-flex justify-content-end">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedTag === 'all' ? 'All' : getTagName(selectedTag)}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('all')}>All</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('lift')}>Lift</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('washing_machine')}>Washing Machine</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('water_filter')}>Water Filter</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('bathroom')}>Bathroom</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('house_keeping')}>House Keeping</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('lan_status')}>LAN Status</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('electrical')}>Electrical</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('furniture')}>Furniture</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('civil_complaints')}>Civil Complaints</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('pest_control')}>Pest Control</button></li>
                    <li><button className="dropdown-item" onClick={() => filterTicketsByTag('green_office')}>Green Office</button></li>
                    {/* Add more dropdown items for other tags */}
                </ul>
            </div>
            <div className="row">
                {filteredTickets.map((ticket) => (
                    <div className="col-md-4" key={ticket.id} onClick={() => {
                        const selectedTicketData = {
                            id: ticket.id,
                            raised_time: ticket.raised_time,
                            title: ticket.title,
                            tag: ticket.tag,
                            ticket_status: ticket.ticket_status,
                            ticket_description: ticket.ticket_description,
                            file_upload: ticket.file_upload,
                            reply: ticket.reply,
                            filtered: ticket.filtered
                        };
                        localStorage.setItem("selectedTicket", JSON.stringify(selectedTicketData));
                    }}>
                        <div className="card mb-3">
                            <div className="card-header">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className={`badge bg-${ticket.ticket_status === 0 ? 'success' : 'danger'}`}>{ticket.ticket_status === 0 ? 'Open' : 'Closed'}</span>
                                    <span className={`badge bg-dark`}>{getTagName(ticket.tag)}</span>
                                </div>
                            </div>
                            <div className="card-body text-center">
                                <h6 className="card-title" style={{ fontSize: '1rem' }}>{ticket.title}</h6>
                            </div>
                            <div className="card-footer text-end">
                                <Link to={{ pathname: "/display_ticket/ticket_details" }}>
                                    <button type="button" className="btn btn-sm btn-info text-white">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </>
    );
}

export default DisplayTickets;
