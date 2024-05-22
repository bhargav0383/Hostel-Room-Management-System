import React, { useEffect, useState } from "react";
import axios from './axios';

function SearchStudent() {
    const [myFloors, setMyFloors] = useState([]);
    const [selectFloor, setSelectFloor] = useState({
        floor_num: '',
        pod_num: ''
    });
    const [Users, setUsers] = useState([]);
    const [showContainer, setShowContainer] = useState(false); // State to control container visibility

    useEffect(() => {
        var hostel_block = localStorage.getItem('hostel_block');
        axios.post(`/floors/${hostel_block}`)
            .then((res) => {
                console.log("hostel_blocks: [][][][ ", res.data);
                setMyFloors(res.data);
            })
            .catch((error) => console.log("Error:", error));
    }, []);

    const onChangeFloor = (event) => {
        setSelectFloor({ ...selectFloor, [event.target.name]: event.target.value });
        console.log("selectFloor: ", selectFloor);
    };

    const handleSubmitFloorPod = (e) => {
        e.preventDefault();
        console.log("selectFloor: ", selectFloor);
        axios.post('/floor_pod', selectFloor)
            .then((res) => {
                console.log("hostel_blocks: [][][][ ", res.data);
                setUsers(res.data);
                setShowContainer(true); // Show the container after getting data
            })
            .catch((error) => console.log("Error:", error));
    }

    return (
        <>
            <div className="container">
                <h2 className="text-center mb-3">Search a Student in the Block</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card bg-light my-3">
                            <div className="card-body">
                                <h5 className="card-title">Select Floor:</h5>
                                <select className="form-select mb-3" name="floor_num" value={selectFloor.floor_num} onChange={onChangeFloor}>
                                    <option value="">Select Floor</option>
                                    {myFloors.map((floor) => (
                                        <option key={floor.floor_number} value={floor.floor_number}>
                                            {floor.floor_number}
                                        </option>
                                    ))}
                                </select>
                                <h5 className="card-title">Select Pod:</h5>
                                <select className="form-select mb-3" name="pod_num" value={selectFloor.pod_num} onChange={onChangeFloor}>
                                    <option value="">Select Pod</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                                <button type="button" className="btn btn-success mb-3" onClick={handleSubmitFloorPod}>Submit Floor and Pod</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showContainer && (
                <div className="container mt-5">
                    <hr/>
                    <div className="row">
                        <div className="col-md-12 text-center mb-3">
                            <h2>Students List</h2>
                        </div>
                        {Users.length > 0 ? (
                            Users.map((user) => (
                                <div key={user.id} className="col-md-3 mb-3">
                                    <div className="card">
                                        <div className="card-header text-center"><strong>{user.room_number}</strong></div>
                                        <div className="card-body text-center">
                                            <p className="card-title"><strong>Name:</strong> {user.username}</p>
                                            <p className="card-text"><strong>ID:</strong> {user.id}</p>
                                            <p className="card-text"><strong>Phone Number: </strong> {user.phone_number}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="alert alert-info text-center mx-auto my-3 w-50" role="alert">
                                No students to show, room are not occupied!!!
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default SearchStudent;
