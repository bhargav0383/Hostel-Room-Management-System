const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path'); // Add path module
const db = require('./db.js');

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Add a timestamp to the filename to make it unique
    }
});

// Initialize multer middleware
const upload = multer({ storage: storage });

// Endpoint to create a new ticket with file upload
router.post('/:id', upload.single('file_upload'), (req, res) => {
    console.log(req);
    try {
        // Check if a file was uploaded
        if (!req.file) {
            throw new Error('No file uploaded');
        }

        // Retrieve other form data from req.body
        const userId = req.params.id;
        const { tag, title, ticket_description } = req.body;

        // Get the filename of the uploaded file (Multer adds this to req.file)
        const file_upload = req.file.filename;

        // Query to insert new ticket details into the database
        const insertTicketQuery = `
            INSERT INTO tickets (id, tag, title, ticket_description, file_upload, ticket_status, filtered)
            VALUES (?, ?, ?, ?, ?, FALSE, FALSE)
        `;

        // Define the columns to update in the rooms table based on the tag
        const roomsColumnsToUpdate = {
            lan_status: 'lan_status',
            electrical: 'electrical',
            furniture: 'furniture'
            // Add more tag mappings here as needed
        };

        // Define the columns to update in the floors table based on the tag
        const floorsColumnsToUpdate = {
            lift: 'lift_working_status',
            washing_machine: 'washing_machine_working_status',
            water_filter: 'water_filter_working_status',
            bathroom: 'bathroom_working_status',
            housekeeping: 'housekeeping_working_status'
            // Add more tag mappings here as needed
        };

        const roomsColumnToUpdate = roomsColumnsToUpdate[tag];
        const floorsColumnToUpdate = floorsColumnsToUpdate[tag];

        // Query to update the tag-related field in the rooms table
        const updateRoomsQuery = `
            UPDATE rooms
            SET ${roomsColumnToUpdate} = FALSE
        `;

        // Query to update the tag-related field in the floors table
        const updateFloorsQuery = `
            UPDATE floors
            SET ${floorsColumnToUpdate} = FALSE
        `;

        db.beginTransaction(err => {
            if (err) {
                console.error('Error starting transaction:', err);
                res.status(500).send('Failed to create ticket');
                return;
            }

            // Execute the ticket insertion query
            db.query(insertTicketQuery, [userId, tag, title, ticket_description, file_upload], (err, result) => {
                if (err) {
                    console.error('Error creating ticket:', err);
                    db.rollback(() => {
                        res.status(500).send('Failed to create ticket');
                    });
                    return;
                }
                if (result.affectedRows !== 1) {
                    db.rollback(() => {
                        res.status(500).send('Failed to create ticket');
                    });
                    return;
                }

                // Execute the update query for rooms or floors
                const updateQuery = roomsColumnToUpdate ? updateRoomsQuery : updateFloorsQuery;

                db.query(updateQuery, (err, result) => {
                    if (err) {
                        console.error('Error updating rooms or floors:', err);
                        db.rollback(() => {
                            res.status(500).send('Failed to create ticket');
                        });
                        return;
                    }

                    // If all queries succeed, commit the transaction
                    db.commit(err => {
                        if (err) {
                            console.error('Error committing transaction:', err);
                            db.rollback(() => {
                                res.status(500).send('Failed to create ticket');
                            });
                            return;
                        }

                        // Return success response
                        res.status(201).json({ message: 'Ticket created successfully' });
                    });
                });
            });
        });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).send('Failed to create ticket');
    }
});



router.get('/:id', (req, res) => {
    const userId = req.params.id;
    const statusFilter = req.query.status || ''; // Get the status filter query parameter

    let selectTicketQuery = 'SELECT * FROM tickets WHERE id = ?';
    const queryParams = [userId];

    // Append the status filter to the query if provided
    if (statusFilter === '0' || statusFilter === '1') {
        selectTicketQuery += ' AND ticket_status = ?';
        queryParams.push(statusFilter);
    }

    selectTicketQuery += ' ORDER BY raised_time DESC';

    db.query(selectTicketQuery, queryParams, (err, result) => {
        if (err) {
            console.error('Error fetching ticket details:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(result);
    });
});


module.exports = router;
