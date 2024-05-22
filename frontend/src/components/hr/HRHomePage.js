import React, { useState, useEffect, useRef } from 'react';
import axios from './axios';
import HRAnnouncements from './HRAnnouncements';
import FilterTickets from './FilterTickets';
import SearchStudent from './SearchStudent';

export default function HRHomePage() {
    const navbarRef = useRef(null);
    useEffect(() => {
        // get the user type from local storage
        const userType = localStorage.getItem("user_type");
        // if the user type is not student, redirect to the login page
        if(userType === "student" ) {
            window.location.href = '/student';
        }
        if(userType === "ho") {
            window.location.href = '/ho';
        }

        // Add padding to the top of the content equal to the height of the navbar
        if (navbarRef.current) {
            const navbarHeight = navbarRef.current.clientHeight;
            document.body.style.paddingTop = `${navbarHeight}px`;
        }
    }, [])

    const [curPage, setCurPage] = useState('HRAnnouncements');

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
                                <button onClick={() => setCurPage('HRAnnouncements')} className={`nav-link ${curPage === 'HRAnnouncements' ? 'active' : ''}`} aria-current="page">Announcements</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => setCurPage('FilterTickets')} className={`nav-link ${curPage === 'FilterTickets' ? 'active' : ''}`} aria-current="page">Filter Tickets</button>
                            </li>
                            <li className="nav-item">
                                <button onClick={() => setCurPage('SearchStudent')} className={`nav-link ${curPage === 'SearchStudent' ? 'active' : ''}`} aria-current="page">Search Student</button>
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
                        {curPage === 'HRAnnouncements' && <HRAnnouncements />}
                        {curPage === 'FilterTickets' && <FilterTickets />}
                        {curPage === 'SearchStudent' && <SearchStudent />}
                    </div>
                </div>
            </div>
        </>
    )
}
