const express = require('express');
const router = express.Router();
const db = require('./db.js');

// Endpoint to search users with IDs starting with 'hr.' and find users with the same room number
router.get('/', (req, res) => {
    const query = 'SELECT u1.id as hrId, u2.id as studentId, u1.room_number FROM users u1 JOIN users u2 ON u1.room_number = u2.room_number AND u1.id LIKE "hr.%" AND NOT u2.id LIKE "hr.%"';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error searching users:', err);
            res.status(500).send('Error searching users');
            return;
        }
        console.log("gdgngs", results);
        res.json(results);
    });
});

  // Define a mapping between HR names and block codes
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
  
  // Endpoint to update HR details with student details
  router.put('/', (req, res) => {
      const updatedUserDetails = req.body;
      console.log("gdgngs", updatedUserDetails);
  
      // Iterate over updatedUserDetails and update corresponding HR rows
      Promise.all(updatedUserDetails.map(user => {
          const studentId = user.studentId;
  
          // Fetch other details of the student from the users table
          const getUserDetailsQuery = 'SELECT * FROM users WHERE id = ?';
  
          return new Promise((resolve, reject) => {
              db.query(getUserDetailsQuery, [studentId], (err, result) => {
                  if (err) {
                      reject(err);
                  } else {
                      resolve(result);
                  }
              });
          }).then(([studentDetails]) => {
              // Extract block code from HR name
              const hrIdParts = user.hrId.split('@');
              const hrName = hrIdParts[0].split('.')[1];
              const hrBlockCode = blockCodes[hrName.toLowerCase()];
              
              // Extract block code from student's room number
              const studentBlockCode = studentDetails.room_number[0];
  
              // Check if the room number is in the same block as the HR
              if (hrBlockCode !== studentBlockCode) {
                  throw new Error('Student is not assigned to the same block as the HR');
              }
  
              // Update HR row with student details
              const updateHRQuery = 'UPDATE users SET username = ?, password = ?, room_number = ?, phone_number = ? WHERE id = ?';
              const { username, password, room_number, phone_number } = studentDetails;
              return new Promise((resolve, reject) => {
                  db.query(updateHRQuery, [username, password, room_number, phone_number, user.hrId], (err, result) => {
                      if (err) {
                          reject(err);
                      } else {
                          resolve(result);
                      }
                  });
              });
          });
      })).then(() => {
          res.status(200).send('User details updated successfully');
      }).catch(error => {
          console.error('Error updating user details:', error);
          res.status(500).send('Error updating user details');
      });
  });
  
  

module.exports = router;
