var express = require('express');
const router = express.Router()
var db = require('./db');

router.post('/', function (req, res) { // this route is for getting floors
    console.log("hostel_blocks_id: [][][][][]")
    console.log(req.body);
    var floor_num = req.body.floor_num;
    var pod_num = req.body.pod_num;
    var room_number_start = "";
    // if pod_num == 1 then room_number_start = floor_num + '01' and room_number_end = floor_num + '08'
    if(pod_num == 1){
        room_number_start = floor_num + '01';
        room_number_end = floor_num + '08';
    }
    else if(pod_num == 2){
        room_number_start = floor_num + '09';
        room_number_end = floor_num + '16';
    }
    else{
        room_number_start = floor_num + ((pod_num - 1) * 8 + 1);
        room_number_end = floor_num + (pod_num * 8);        
    }
    db.query('SELECT * FROM users WHERE room_number >= ? AND room_number <= ?', [room_number_start, room_number_end], function (error, results, fields) {
        console.log(results);
        if (error) throw error;
        res.send(results);
    });
    
    // select from students where floor_number >= floor_num  
    
});

module.exports = router;