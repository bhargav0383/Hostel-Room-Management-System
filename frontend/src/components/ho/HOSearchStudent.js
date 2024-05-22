import React, { useEffect, useState } from "react";
import axios from './axios';

function HOSearchStudent() {
    const [myHostelBlocks, setMyHostelBlocks] = useState([]);
    const [selectedBlockId, setSelectedBlockId] = useState('');
    const [myFloors, setMyFloors] = useState([]);
    const [selectFloor, setSelectFloor] = useState({
        floor_num: '',
        pod_num: '1' // Default value for pod_num
    });
    const [Users, setUsers] = useState([]);
    const [showStudentList, setShowStudentList] = useState(false); // State to control visibility of student list

    useEffect(() => {
        axios.get("/hostel_blocks")
            .then((res) => {
                console.log(res.data);
                setMyHostelBlocks(res.data);
            })
            .catch((error) => console.log("ERROR IN HOSTEL BLOCKS:", error));
    }, []);

    const handleSubmit = () => {
        console.log("selectedBlockId: ", selectedBlockId);
        axios.post(`/floors/${selectedBlockId}`)
            .then((res) => {
                console.log("Floors:", res.data);
                setMyFloors(res.data);
                // Reset the floor and pod selection when hostel block changes
                setSelectFloor({
                    floor_num: '',
                    pod_num: '1'
                });
            })
            .catch((error) => console.log("Error fetching floors:", error));
    }

    const onChangeFloor = (event) => {
        setSelectFloor({ ...selectFloor, [event.target.name]: event.target.value });
        console.log("selectFloor: ", selectFloor);
    };

    const onChangePod = (event) => {
        setSelectFloor({ ...selectFloor, pod_num: event.target.value });
        console.log("selectFloor: ", selectFloor);
    };

    const handleSubmitFloorPod = () => {
        console.log("selectFloor: ", selectFloor);
        axios.post('/floor_pod', selectFloor)
            .then((res) => {
                console.log("Student List:", res.data);
                setUsers(res.data);
                setShowStudentList(true); // Set showStudentList to true when student list is fetched
            })
            .catch((error) => console.log("Error fetching student list:", error));
    }

    return (
        <>
            <div className="container">
                <h2 className="text-center mb-3">Search a Student</h2>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card my-3 bg-light">
                            <div className="card-body">
                                <h4 className="card-title">Select Hostel Block:</h4>
                                <select className="form-select mb-3" name="Hostel Blocks" onChange={(e) => setSelectedBlockId(e.target.value)}>
                                    <option value="">Select Hostel Block</option>
                                    {myHostelBlocks.map((hostelBlock) => (
                                        <option key={hostelBlock.block_id} value={hostelBlock.block_id}>
                                            {hostelBlock.block_id} - {hostelBlock.block_name}
                                        </option>
                                    ))}
                                </select>
                                <button type="button" className="btn btn-warning mb-3" onClick={handleSubmit}>Submit Hostel Block</button>

                                <h4 className="card-title">Select Floor:</h4>
                                <select className="form-select mb-3" name="floor_num" value={selectFloor.floor_num} onChange={onChangeFloor}>
                                    <option value="">Select Floor</option>
                                    {myFloors.map((floor) => (
                                        <option key={floor.floor_number} value={floor.floor_number}>
                                            {floor.floor_number}
                                        </option>
                                    ))}
                                </select>

                                <h4 className="card-title">Select Pod:</h4>
                                <select className="form-select mb-3" name="pod_num" value={selectFloor.pod_num} onChange={onChangePod}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>

                                <button type="button" className="btn btn-danger mb-3" onClick={handleSubmitFloorPod}>Submit Floor and Pod</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showStudentList && (
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
                                No students to show, rooms are not occupied!!!
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default HOSearchStudent;
