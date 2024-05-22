import React, { useState, useEffect } from 'react';
import axios from 'axios';

const blockNames = {
  A: 'Aryabhatta',
  B: 'Bhaskara',
  C: 'Charaka',
  D: 'Susruta',
  E: 'Kautilya',
  F: 'Vyasa',
  G: 'Brahmagupta',
  H: 'Varahamihira'
};

const AllotHr = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allotHr');
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const getBlockName = (roomNumber) => {
    const blockCode = roomNumber[0];
    return blockNames[blockCode];
  };

  const handleInputChange = (e, hrId) => {
    const { name, value } = e.target;
    setUserDetails(prevUserDetails => {
      return prevUserDetails.map(user => {
        if (user.hrId === hrId) {
          return {
            ...user,
            [name]: value
          };
        }
        return user;
      });
    });
  };

  const handleToggleEdit = () => {
    setEditing(prevEditing => !prevEditing);
  };

  const handleCancelChanges = () => {
    setEditing(false); // Set editing state to false
    // fetchUserDetails();
    // window.location.reload();
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put('http://localhost:5000/allotHr', userDetails);
      console.log('User details updated successfully');
      setEditing(false);
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  const renderUserDetails = () => {
    // Sort userDetails array by block code in ascending order
    const sortedUserDetails = userDetails.slice().sort((a, b) => {
      const blockCodeA = a.room_number[0];
      const blockCodeB = b.room_number[0];
      return blockCodeA.localeCompare(blockCodeB);
    });
  
    return (
      <div className="table-responsive">
        <table className="table table-striped table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th>Block Code</th>
              <th>Block Name</th>
              <th>Hr ID</th>
              <th>Student ID</th>
            </tr>
          </thead>
          <tbody>
          {sortedUserDetails.map((user) => (
            <tr key={user.hrId}> {/* Use a unique identifier as the key */}
                <td>{user.room_number[0]}</td>
                <td>{getBlockName(user.room_number)}</td>
                <td>{user.hrId}</td>
                <td>
                {editing ? (
                    <input
                    type="text"
                    name="studentId"
                    className="form-control"
                    value={user.studentId}
                    onChange={(e) => handleInputChange(e, user.hrId)} /* Pass hrId as the identifier */
                    />
                ) : (
                    user.studentId
                )}
                </td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

  return (
    <div className="container">
      <h1 className="mb-4 text-center">Allotted HR's</h1>
      {renderUserDetails()}
      <div className="d-flex justify-content-center">
        {editing ? (
          <div className="btn-group">
            <button className="btn btn-success mr-4" onClick={handleSaveChanges}>Save Changes</button>
            <button className="btn btn-danger" onClick={handleCancelChanges}>Cancel Changes</button>
          </div>
        ) : (
          <button className="btn btn-primary mb-3" onClick={handleToggleEdit}>Edit Student IDs</button>
        )}
      </div>
    </div>
  );
};

export default AllotHr;
