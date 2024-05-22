var express = require('express');
const router = express.Router()
var db = require('./db');


router.post('/:hostel_block', function (req, res) {
    var block_id = req.params.hostel_block;
    db.query('SELECT floor_number FROM floors WHERE floor_number LIKE ?', [block_id + '%'], function (error, results, fields) {
        if (error) {
            console.error('Error retrieving floor numbers:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(results);
        res.send(results);
    });
});


module.exports = router;