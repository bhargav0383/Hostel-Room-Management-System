import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import axios from './axios';
import MyProfile from './MyProfile';
import MyPod from './MyPod';
import Announcements from './Announcements';
import RoomMgmt from './RoomMgmt';
import Tickets from './Tickets';

export default function StudentHomePage() {
    const [curRoom, setCurRoom] = useState('');
    useEffect(() => {
        // get the user type from local storage
        const userType = localStorage.getItem("user_type");
        // if the user type is not student, redirect to the login page
        if (userType === "hr") {
            window.location.href = '/hr';
        }
        if (userType === "ho") {
            window.location.href = '/ho';
        }
        var room = localStorage.getItem("roomNumber");
        if (room === "null") {
            room = null;
        }
        setCurRoom(room);
    }, [])

    const [curPage, setCurPage] = useState(curRoom ? "Announcements" : "RoomMgmt");

    const handleLogout = () => {
        localStorage.removeItem("user_type");
        localStorage.removeItem("userId");
        localStorage.removeItem("hostel_block");
        window.location.href = "/";
    }

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="md" className="pl-4 justify-content-between fixed-top">
                <Navbar.Brand href="#" className='mx-3'>Hostel Room Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => setCurPage("MyProfile")} className={curPage === "MyProfile" ? "active" : ""}>My Profile</Nav.Link>
                        <Nav.Link onClick={() => setCurPage("MyPod")} className={curPage === "MyPod" ? "active" : ""} disabled={curRoom === null }>My Pod</Nav.Link>
                        <Nav.Link onClick={() => setCurPage("Announcements")} className={curPage === "Announcements" ? "active" : ""} disabled={curRoom === null }>Announcements</Nav.Link>
                        <Nav.Link onClick={() => setCurPage("RoomMgmt")} className={curPage === "RoomMgmt" ? "active" : ""}>Room Management</Nav.Link>
                        <Nav.Link onClick={() => setCurPage("Tickets")} className={curPage === "Tickets" ? "active" : ""} disabled={curRoom === null }>Complaints</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Text>
                    <button onClick={handleLogout} type="button" className="btn btn-outline-warning me-5">Log out</button>
                </Navbar.Text>
            </Navbar>

            <div className="container mt-5" style={{ paddingTop: "50px" }}>
                <div className="row">
                    <div className="col-md">
                        {curPage === "MyProfile" && <MyProfile />}
                        {curPage === "MyPod" && <MyPod />}
                        {curPage === "Announcements" && <Announcements />}
                        {curPage === "RoomMgmt" && <RoomMgmt />}
                        {curPage === "Tickets" && <Tickets />}
                    </div>
                </div>
            </div>
        </>
    );
}
