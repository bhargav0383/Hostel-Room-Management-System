const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/', (req, res) => {
    db.query('SELECT *, DATE_FORMAT(start_time, "%Y-%m-%d %H:%i:%s") AS start_time_formatted, DATE_FORMAT(end_time, "%Y-%m-%d %H:%i:%s") AS end_time_formatted FROM check_in', (err, results) => {
        if (err) {
            console.error('Error fetching checkin_approval:', err);
            res.status(500).send('Error in fetching checkin_approval');
        } else {
            console.log(results[0]);
            res.send(results);
        }
    });
});

router.post('/approve', (req, res) => {
    // const { id, start_time } = req.body;
    console.log('Approving checkin:', req.body);
    const { id, start_time_formatted } = req.body;
    console.log('Approving checkin:', id," -=-==- ", start_time_formatted);

    db.query("SELECT room_number FROM users WHERE id=?", [id], (err, userResults) => {
        if (err) {
            console.error('Error approving checkin: Unable to fetch user details', err);
            res.status(500).send('Error in approving checkin');
        } else {
            const room_number = userResults[0]?.room_number;

            if (!room_number) {
                console.error('Error approving checkin: User not found or room number not assigned');
                res.status(400).send('User not found or room number not assigned');
                return;
            }

            db.query('DELETE FROM check_in WHERE id=? AND start_time=?', [id, start_time_formatted], (deleteErr, deleteResults) => {
                if (deleteErr) {
                    console.error('Error approving checkin: Unable to delete checkin record', deleteErr);
                    res.status(500).send('Error in approving checkin');
                } else {
                    db.query('UPDATE rooms SET leave_room=1 WHERE room_no=?', [room_number], (updateErr, updateResults) => {
                        if (updateErr) {
                            console.error('Error approving checkin: Unable to update room status', updateErr);
                            res.status(500).send('Error in approving checkin');
                        } else {
                            console.log('Checkin approved');
                            res.send('Checkin approved');
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
