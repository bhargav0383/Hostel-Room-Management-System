const express = require('express');
const router = express.Router();
const path = require('path');
const db = require('./db.js');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

router.get('/', (req, res) => {
    res.send('Login route')
    console.log('Login route');

});

//first letter extraction from given string
function extract_first_letter(str) {
    if(str==null) return null;
    console.log(str)
    var res = str[0];
    return res;
}
//function to remove first letter of the string and return the remaining string
function remove_first_letter(str) {
    if(str==null) return null;
    var res = str.slice(1);
    return res;
}
//function to return user type: student or HR or HO 
function get_user_type(id) {
    // if id starts with 'HR' then return 'HR'
    if (id.startsWith('hr')) {
        return 'hr';
    }
    // if id starts with 'HO' then return 'HO'
    // 
    else if (id.startsWith('office.')) {
        return 'ho';
    }
    else return 'student';
}



router.post('/', (req, res) => {
    console.log(req.body);
    // trim extra spaces from the input
    req.body.id = req.body.id.trim();
    db.query('SELECT * FROM users WHERE id = ? AND password = ?', [req.body.id, req.body.password], (error, results, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send('An error occurred while logging in');
        } else {
            if (results.length > 0) {
                // send the user type to the frontend and send first letter of the user type
                console.log(results[0]);
                res.status(200).send({ userId: req.body.id, 
                                    userType: get_user_type(req.body.id), 
                                    roomNumber: remove_first_letter(results[0].room_number),
                                    firstLetter: extract_first_letter(results[0].room_number) });
            } else {
                res.status(401).send('Invalid login credentials');
            }
        }
    }
    );
    
  
});


router.post('/forgot_password', function (req, res) {
    console.log("bring_password")
    console.log(req.body)
    var password_recovered = "NULL_PASSWORD ";
    var email_id = req.body.email_id;
    console.log(email_id + ' email-----id  ');

    db.query('SELECT password FROM users WHERE id = ?', email_id, function (error, results, fields) {
        console.log(results);
        if (error) throw error;

        // Check if results are empty
        if (results.length === 0) {
            console.log("Email ID does not exist");
            res.status(404).send('Email ID does not exist');
            return;
        }

        password_recovered = results[0].password;
        console.log("password_recovered: ", password_recovered);
    
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
            to: email_id,
            subject: "Password Recovery",
            text: "Your password is: "+password_recovered
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

    });
});


module.exports = router;