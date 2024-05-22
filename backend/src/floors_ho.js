var express = require('express');
const router = express.Router()
var db = require('./db');


router.post('/:selectedBlockId', function (req, res) {
    console.log("selectedBlockId: ", req.params.selectedBlockId);
    let block_id = req.params.selectedBlockId + "%";
    let sql = 'SELECT floor_number FROM floors WHERE floor_number like ?';
    db.query(sql, [block_id], function (error, results, fields) {
        console.log(results);
        if (error) throw error;
        res.send(results);
    });
});


module.exports = router;