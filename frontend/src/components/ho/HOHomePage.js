import React, { useState, useEffect, useRef } from 'react';
import axios from './axios';
import HOAnnouncements from './HOAnnouncements';
import HOTickets from './HOTickets';
import HOSearchStudent from './HOSearchStudent';
import AllotHR from './AllotHR';
import HOExchange from './HOExchange';
import HOCheckin from './HOCheckin';

export default function HOHomePage() {
    const navbarRef = useRef(null);
    useEffect(() => {
        // get the user type from local storage
        const userType = localStorage.getItem("user_type");
        // if the user type is not student, redirect to the login page
        if(userType === "student" ) {
            window.location.href = '/student';
        }
        if(userType === "hr") {
            window.location.href = '/hr';
        }

        // Add padding to the top of the content equal to the height of the navbar
        if (navbarRef.current) {
            const navbarHeight = navbarRef.current.clientHeight;
            document.body.style.paddingTop = `${navbarHeight}px`;
        }
    }, [])

    const [curPage, setCurPage] = useState('HOAnnouncements');

    const handleLogout = () => {
        localStorage.removeItem("user_type");
        localStorage.removeItem("userId");
        localStorage.removeItem("hostel_block");
        window.location.href = "/";
    }

    return (
        <>
            <nav ref={navbarRef} className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="container-fluid">
                    <a className="navbar-brand mx-2" href="#">Hostel Room Management System</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button onClick={() => setCurPage('HOAnnouncements')} className={`nav-link ${curPage === 'HOAnnouncements' ? 'active' : ''}`} aria-current="page">Announcements</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => setCurPage('HOTickets')} className={`nav-link ${curPage === 'HOTickets' ? 'active' : ''}`} aria-current="page">Tickets</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => setCurPage('HOExchange')} className={`nav-link ${curPage === 'HOExchange' ? 'active' : ''}`} aria-current="page">Exchange Requests</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => setCurPage('HOCheckin')} className={`nav-link ${curPage === 'HOCheckin' ? 'active' : ''}`} aria-current="page">Check In/Out Requests</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => setCurPage('AllotHR')} className={`nav-link ${curPage === 'AllotHR' ? 'active' : ''}`} aria-current="page">Allot HR</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => setCurPage('HOSearchStudent')} className={`nav-link ${curPage === 'HOSearchStudent' ? 'active' : ''}`} aria-current="page">Search Student</button>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-3">
                                <button onClick={() => {handleLogout()}} type="button" className="btn btn-outline-warning">Log out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container" style={{ marginTop: "56px" /* Adjust this value if needed */ }}>
                <div className="row">
                    <div className="col-md-12">
                        {curPage === 'HOAnnouncements' && <HOAnnouncements />}
                        {curPage === 'HOTickets' && <HOTickets />}
                        {curPage === 'HOExchange' && <HOExchange />}
                        {curPage === 'HOCheckin' && <HOCheckin />}
                        {curPage === 'AllotHR' && <AllotHR />}
                        {curPage === 'HOSearchStudent' && <HOSearchStudent />}
                    </div>
                </div>
            </div>
        </>
    )
}
