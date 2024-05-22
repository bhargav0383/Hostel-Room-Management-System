// backend/routes/roomExchangeApproval.js

const express = require('express');
const router = express.Router();
const db = require('./db');

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    const query = `
        SELECT *
        FROM room_exchange re1
        WHERE EXISTS (
            SELECT *
            FROM room_exchange re2
            WHERE re1.room_number_from = re2.room_number_to
            AND re1.room_number_to = re2.room_number_from
            AND re1.id != re2.id
        )
    `;

    db.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching mutual room exchanges:', error);
            res.status(500).send({ error: 'Error fetching mutual room exchanges' });
        } else {
            const mutualRequestsMap = new Map();

            // Group results by room exchange pairs
            results.forEach(result => {
                const key = [result.room_number_from, result.room_number_to].sort().join('-');

                if (mutualRequestsMap.has(key)) {
                    mutualRequestsMap.get(key).push(result);
                } else {
                    mutualRequestsMap.set(key, [result]);
                }
            });

            const mutualRequests = Array.from(mutualRequestsMap.values());
            res.send(mutualRequests);
        }
    });
});

// function to send email to the user
function sendEmail(email, subject, text) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'cs21btech11059@iith.ac.in',
          pass: 'fdez jgow ubce ifps'
        }
      });

    // Email content
    const mailOptions = {
        from: 'cs21btech11059@iith.ac.in',
        to: email,
        subject: subject,
        text: text
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        console.log("Sending email");
        console.log(email_id);
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent');
            // give an alert box email sent
        }
    });
}

router.post('/', (req, res) => {
    const { req1id, req2id, req1from, req2from } = req.body;

    const deleteQuery = `
        DELETE FROM room_exchange
        WHERE (id = ? AND room_number_from = ?)
        OR (id = ? AND room_number_from = ?)
    `;

    db.query(deleteQuery, [req1id, req1from, req2id, req2from], (deleteError, deleteResults) => {
        if (deleteError) {
            console.error('Error deleting room exchanges:', deleteError);
            return res.status(500).send({ error: 'Error deleting room exchanges' });
        } else {
            const updateQuery = `
                UPDATE users
                SET room_number = CASE
                    WHEN id = ? THEN ?
                    WHEN id = ? THEN ?
                    ELSE room_number
                END
            `;

            db.query(updateQuery, [req1id, req2from, req2id, req1from], (updateError, updateResults) => {
                if (updateError) {
                    console.error('Error updating users:', updateError);
                    return res.status(500).send({ error: 'Error updating users' });
                } else {
                    // send email to the users
                    sendEmail(req1id, "Room Exchange Approved", "Your room exchange has been approved to "+req2from);
                    sendEmail(req2id, "Room Exchange Approved", "Your room exchange has been approved to "+req1from);
                    res.send({ message: 'Room exchange approved' });
                }
            });
        }
    });
});

module.exports = router;
