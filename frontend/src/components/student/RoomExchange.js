import React, { useState, useEffect } from 'react';
import axios from './axios';

export default function RoomExchange() {
    const [id, setId] = useState('cs21btech11002@iith.ac.in');
    const [roomNumber, setRoomNumber] = useState(null);
    const [exchangeform, setExchangeForm] = useState({
        room_exchange_description: '',
        room_number_from: '',
        room_number_to: '',
        id: ''
    });
    const [selectedBlock, setSelectedBlock] = useState('');

    const hostelBlocks = ['aryabhatta', 'bhaskara', 'charaka', 'susruta', 'kautilya', 'vyasa', 'brahmagupta', 'varahamihira'];

    useEffect(() => {
        setId(localStorage.getItem("userId"));
        var room_no = localStorage.getItem("roomNumber");
        setRoomNumber(room_no);
        if (localStorage.getItem("roomNumber") === "null") {
            setRoomNumber(null);
        }
        setExchangeForm({ ...exchangeform, room_number_from: room_no,id:localStorage.getItem("userId") });
    }, []);


    const getBlockCode = (blockName) => {
        const blockCodes = {
            'aryabhatta': 'A',
            'bhaskara': 'B',
            'charaka': 'C',
            'susruta': 'D',
            'kautilya': 'E',
            'vyasa': 'F',
            'brahmagupta': 'G',
            'varahamihira': 'H'
        };
        return blockCodes[blockName];
    };

    const handleBlockChange = (e) => {
        setSelectedBlock(e.target.value);
    };

    const handleRoomChange = (e) => {
        setExchangeForm({ ...exchangeform, room_number_to: e.target.value });
    };

    const handleSubmit = () => {
        // the room_number_to should be in the format of block_code + room_number
        const blockCode = getBlockCode(selectedBlock);
        const roomNumber = exchangeform.room_number_to;
        console.log('roomNumber',roomNumber);
        console.log('blockCode',blockCode);
        // check if first number of room number is a digit(between 1-6), the next two digits are between 01-32
        if (roomNumber.length !== 3 || isNaN(roomNumber[0]) || roomNumber[0] < 1 || roomNumber[0] > 6 || isNaN(roomNumber.slice(1)) || roomNumber.slice(1) < 1 || roomNumber.slice(1) > 32) {
            alert("Invalid Room Number fomat should be 1-6 followed by 01-32");
            return;
        }

        //check if the room number if same as the current room number
        if (exchangeform.room_number_from === blockCode + roomNumber) {
            alert("You cannot exchange room with the same room");
            return;
        }

        setExchangeForm({ ...exchangeform, room_number_to: blockCode + roomNumber });
        //check if all fields are filled
        if (exchangeform.room_exchange_description === '' || exchangeform.room_number_to === '') {
            alert("Please fill all the fields");
            return;
        }
        var temp=exchangeform
        console.log(temp);
        temp.room_number_from=localStorage.getItem('hostel_block')+temp.room_number_from;
        temp.room_number_to=blockCode+temp.room_number_to;
        axios.post('/room_exchange', temp)
            .then((res) => {
                if (res.status === 200) {
                    alert("Room Exchange Request Submitted Successfully");
                } else {
                    alert("Error in submitting Room Exchange Request");
                }
            })
            .catch((err) => {
                console.log(err);
                alert("Error in submitting Room Exchange Request");
            });
    };

    return (
        <>  
            <h6 className='alert alert-warning text-center mx-auto my-3 w-75'>You can make multiple requests, but the previous one gets replaced with the lastest one is considered</h6>
            <div className="card mx-auto my-4 w-50">
                <div className="card-header text-center">
                    <h5 className="card-title">Room Exchange Form</h5>
                </div>
                <div className="card-body">
                    <div className="row align-items-center mb-3">
                        <div className="col-md-6">
                            <select className="form-select" onChange={handleBlockChange} placeholder="Select Hostel Block">
                                <option disabled selected value="">Select Hostel Block</option>
                                {hostelBlocks.map(block => (
                                    <option key={block} value={block}>{block}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group mb-0">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="roomNumberTo"
                                    placeholder="To Room Number Ex: '101'"
                                    onChange={handleRoomChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="exchangeDescription">Reason for Room Exchange :</label>
                        <textarea
                            className="form-control"
                            id="exchangeDescription"
                            rows="3"
                            placeholder="Enter description"
                            value={exchangeform.room_exchange_description}
                            onChange={(e) => setExchangeForm({ ...exchangeform, room_exchange_description: e.target.value })}
                        />
                    </div>
                    <div className="text-center">
                        <button className="btn btn-success w-25" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>

        </>
    );
}
