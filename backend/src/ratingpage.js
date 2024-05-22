const express = require('express');
const router = express.Router();
const db = require('./db');



var block_id = null;
router.get('/:id/:room', (req, res) => {
    const userid = req.params.id;
    const room = req.params.room;
    console.log("req",req.body);
    console.log("userid1: " + userid);
    console.log("room1: " + room);
    if (room!= null) block_id = room.substring(0, 1);
    console.log("block_id1: " + block_id);
      db.query('SELECT block_name, rating FROM hostel_blocks', (error, results1, fields) => {
        if (error) {
            console.log(error);
            res.status(500).send('An error occurred while fetching hostel blocks');
        } else {
            if (block_id != null) {
                db.query('SELECT rating FROM ratings WHERE id=? and block_id=?', [userid, block_id], (error, results2, fields) => {
                    if (error) {
                        res.status(500).send('An error occurred while fetching ratings');
                        console.log("error in fetching ratings " + error);
                    } else {
                        console.log("results2: " + results2);
                        if (results2.length > 0) {
                            console.log("results2kl: " + results2[0].rating);
                            results = [results1, results2[0].rating, true];
                            res.status(200).send(results);

                        } else {
                            console.log("results2n: " + results2);
                            results = [results1, results2, false];
                            // console.log("results: " + results[1]);
                            res.status(200).send(results);
                        }

                    }
                });
            }
            else {
                results = [results1, 0, false];
                res.status(200).send(results);



            }
        }
        });
});

router.post('/', (req, res) => {
    // const id_rating = { userid, rating: value };
    // axios.post('http://localhost:5000/ratingpage', {id_rating,rated_bool:alreadyRated})

    const userid = req.body.id_rating.userid;
    const rating = req.body.id_rating.rating;
    const alreadyRated = req.body.rated_bool;
    console.log("userid2: " + userid);
    console.log("block_id2: " + block_id); 
    console.log("rating2: " + rating);
    console.log("alreadyRated2: " + alreadyRated);  
    // INSERT INTO ratings (id, block_id, rating) VALUES (?, ?, ?)
    if (alreadyRated) {
        var query = 'UPDATE ratings SET rating=? WHERE id=? AND block_id=?';
        var values = [rating, userid, block_id];
    }
    else {
        var query = 'INSERT INTO ratings (id, block_id, rating) VALUES (?, ?, ?)';
        var values = [userid, block_id, rating];
    }

    db.query(query, values, (error, results, fields) => {
        if (error) {
            res.status(500).send('An error occurred while submitting ratings');
            console.log("error submitting rating " + error);
        } else {
            db.query('SELECT AVG(rating) AS avg_rating FROM ratings WHERE block_id=?', [block_id], (error, results, fields) => {
                if (error) {
                    res.status(500).send('An error occurred while fetching average ratings');
                    console.log("error fetching avg rating " + error);
                } else {
                    const avg_rating = results[0].avg_rating;
                    db.query('UPDATE hostel_blocks SET rating=? WHERE block_id=?', [avg_rating, block_id], (error, results, fields) => {
                        if (error) {
                            res.status(500).send('An error occurred while updating hostel block ratings');
                            console.log("error updating rating " + error);
                        } else {
                            res.status(200).send('Ratings submitted successfully');
                        }
                    });
                }
            });
        }
    });
});

module.exports = router;
