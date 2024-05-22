import React, { useEffect, useState } from 'react';
import axios from './axios';

export default function RoomAllot() {
    const [roomsdata, setRoomsData] = useState([]);
    const [selectedBlock, setSelectedBlock] = useState("");
    const [selectedFloor, setSelectedFloor] = useState("");
    const [id, setId] = useState('cs21btech11002@iith.ac.in'); // Assuming id is stored in state
    const [roomNumber, setRoomNumber] = useState(null); // Assuming roomNumber is stored in state
    const [block_rating,set_block_rating]=useState([])

    useEffect(() => {
        setId(localStorage.getItem("userId"));
        setRoomNumber(localStorage.getItem("roomNumber"));
        if(localStorage.getItem("roomNumber")==="null"){
            setRoomNumber(null);
        }
        axios.get('/room_allot').then(response => {
            setRoomsData(response.data);
            console.log(response.data)
        });
    }, []);

    useEffect(()=>{
        axios.get('/room_allot/get_rating_block').then(response=>{
            console.log('Helo world ',response.data);
            set_block_rating(response.data);
        })
    },[])

    const handleBlockButtonClick = (blockId) => {
        setSelectedBlock(blockId);
        setSelectedFloor(""); // Reset selectedFloor when block button is clicked
    };

    const handleFloorSelect = (floor) => {
        setSelectedFloor(floor);
    };

    const get_block_rating=(id)=>{
        const block = block_rating.find(item => item.block_id === id);
        return block ? block.rating : null;
        return block_rating[id];
    }

    const allotRoom = () => {
        if (selectedBlock && selectedFloor) {
            const block = roomsdata.find(block => block.block_id === selectedBlock);
            const floor = block[selectedFloor];
            const roomNumber = floor.shift();
            setRoomNumber(roomNumber);
            axios.post('/room_allot', { id, roomNumber }).then(response => {
                // reload the page
                window.location.reload();
                //localstorage.setItem("roomNumber",roomNumber);
                localStorage.setItem("roomNumber", roomNumber);
                localStorage.setItem("hostel_block", selectedBlock);
                // also change the state of the room number in memory
            });
        }
        else {
            alert("Please select block and floor");
        }
    }

        const number_of_rooms_finder = (block) => {
            var rooms=0;
            rooms+=block.floor1.length
            rooms+=block.floor2.length
            rooms+=block.floor3.length
            rooms+=block.floor4.length
            rooms+=block.floor5.length
            rooms+=block.floor6.length
            
            return rooms;
        }

    return (
        <>
            {roomNumber ? (
                <div className='alert alert-warning text-center mx-auto my-3 w-50'>
                    <h5>
                        Room already allotted: {roomNumber}
                    </h5>
                </div>
            ) : (
                <>
                <div className="container">
                        <h5 className='my-3'>Select a Block:</h5>
                        <div className="row row-cols-1 row-cols-md-4 justify-content-center my-3">
                            {roomsdata.map(block => {
                                const hasFreeRooms = Object.keys(block).some(key => {
                                    return key !== "block_id" && key !== "block_name" && block[key].length > 0;
                                });

                                if (hasFreeRooms) {
                                    return (
                                        <div key={block.block_id} className="col mb-4">
                                            <div
                                                className={`card ${selectedBlock === block.block_id ? 'border-primary' : ''}`}
                                                onClick={() => handleBlockButtonClick(block.block_id)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <div className="card-body bg-light">
                                                    <h5 className="card-title text-center">{block.block_name}</h5>
                                                    <p><strong>No of available rooms: </strong> {number_of_rooms_finder(block)}</p>
                                                    <p><strong>Rating: </strong> {get_block_rating(block.block_id)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </div>
                    {selectedBlock && (
                        <div className="d-flex align-items-center">
                            <h5 className='col-auto my-3 mr-3'>Select Floor:</h5>
                            <div className="dropdown mx-3">
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="floorDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    {selectedFloor ? selectedFloor : 'Select Floor'}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="floorDropdown">
                                    {roomsdata
                                        .filter(block => block.block_id === selectedBlock)
                                        .map(block => (
                                            Object.keys(block).filter(key => key.startsWith('floor')).map(floorKey => (
                                                <li key={floorKey}><button className="dropdown-item" type="button" value={floorKey} onClick={() => handleFloorSelect(floorKey)}>{floorKey}</button></li>
                                            ))
                                        ))}
                                </ul>
                            </div>
                        </div>
                    )}
                    <div className="text-center">
                        <button className="btn btn-success w-25" onClick={allotRoom}>Allot Room</button>
                    </div>
                </>
            )}
        </>
    );
}
