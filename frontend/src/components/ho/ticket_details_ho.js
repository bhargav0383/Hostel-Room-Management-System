import React from 'react';
import { useEffect, useState } from "react";

import axios from './axios';

function TicketDetailsHo() {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {  // set the local storage details in the usestate setTickets
       const retrieved_data = localStorage.getItem("selectedTicketHO");
        const ticket = JSON.parse(retrieved_data);
        setTickets(ticket);
        console.log(ticket);
    }, []);
    
    const handleSolveClick = () => {
        // check if the ticket's reply is N/A or not
        if (tickets.ticket_status == 0) {
            const reply_typed = prompt("Please enter your reply");
            if (reply_typed === "") {
                alert("Please enter a reply");
            } else if (reply_typed !== null) { // Check if the user clicked Cancel
                // send the reply_typed to the backend
                axios.put(`http://localhost:5000/tickets_hr/${tickets.id}`, {
                    reply: reply_typed,
                    tag: tickets.tag
                }).then((response) => {
                    console.log(response);
                    alert("Problem solved successfully");
                });
            }
        }
    }
    

    return (
        <div>
            DISPLAY TICKET DETAILS HO::
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">title: {tickets.title}</h5>
                            <p className="card-text">id: {tickets.id}</p>
                    <p className="card-text">raised_time: {tickets.raised_time}</p>
                    <p className="card-text">tag: {tickets.tag}</p>

                <p className="card-text">ticket_status: {tickets.ticket_status}</p>
                        <p className="card-text">filtered: {tickets.filtered}</p>
    <p className="card-text">ticket_description: {tickets.ticket_description}</p>
                    <p className="card-text">file_upload: {tickets.file_upload}</p>
                        <p className="card-text">reply: {tickets.reply}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* put an onclick function for the Solve buttion */}
            <button type="button" class="btn btn-success" onClick={handleSolveClick}>Solve</button>
        </div>
    );
}

export default TicketDetailsHo;