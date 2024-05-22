import React, { useEffect, useReducer, useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import RoomExchange from './RoomExchange';
import RoomAllot from './RoomAllot';
import Rating from './Rating';
import Checkinout from './Checkinout';

export default function RoomMgmt() {
  const [subTab, setSubTab] = useState("RoomAllot");
  const [curRoom, setCurRoom] = useState(null);

  useEffect(() => {
    var hostel_block = localStorage.getItem("hostel_block");
    if (hostel_block === "null") hostel_block = null;
    setCurRoom(hostel_block);
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ButtonGroup className="d-flex justify-content-center">
            <Button
              onClick={() => setSubTab("RoomAllot")}
              variant={subTab === "RoomAllot" ? "dark" : "secondary"}
              disabled={curRoom !== null}
            >
              Room Allotment
            </Button>
            <Button
              onClick={() => setSubTab("RoomExchange")}
              variant={subTab === "RoomExchange" ? "dark" : "secondary"}
              disabled={curRoom === null}
            >
              Room Exchange
            </Button>
            <Button
              onClick={() => setSubTab("Checkinout")}
              variant={subTab === "Checkinout" ? "dark" : "secondary"}
              disabled={curRoom === null}
            >
              Check In/Out
            </Button>
            <Button
              onClick={() => setSubTab("Rating")}
              variant={subTab === "Rating" ? "dark" : "secondary"}
              disabled={curRoom === null}
            >
              Rating
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          {subTab === "RoomAllot" && <RoomAllot />}
          {subTab === "RoomExchange" && <RoomExchange />}
          {subTab === "Checkinout" && <Checkinout />}
          {subTab === "Rating" && <Rating />}
        </div>
      </div>
    </div>
  );
}
