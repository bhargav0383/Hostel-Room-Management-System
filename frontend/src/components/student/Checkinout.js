import React, { useState } from 'react';

export default function Checkinout() {
    const [uploading, setUploading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        // Perform any client-side validation here

        // Set uploading state to true to indicate that the file is being uploaded
        setUploading(true);

        try {
            // Use fetch or any other method to send the form data to the server
            const response = await fetch('http://localhost:5000/checkinout', {
                method: 'POST',
                body: new FormData(event.target),
            });

            if (!response.ok) {
                throw new Error('Failed to upload file');
            }

            // Handle successful response, such as showing a success message
            console.log('File uploaded successfully');
            alert('File uploaded successfully');
            window.location.reload(); // Reload the page to clear the form

        } catch (error) {
            // Handle errors, such as displaying an error message to the user
            console.error('Error uploading file:', error.message);

        } finally {
            // Reset uploading state after upload is complete
            setUploading(false);
        }
    };

    return (
        <>
        <h6 className='alert alert-warning text-center mx-auto my-3 w-75'>You can make multiple requests, but the previous one gets replaced with the lastest one is considered</h6>
        <div className="card w-50 mx-auto">
            <div className="card-header text-center">
                <h5 className="card-title">Check In/Out Form</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input type="hidden" id="id" name="id" value='cs21btech11063@iith.ac.in' />
                    
                    <div className="form-group row mb-3">
                        <label htmlFor="timeRange" className="col-sm-2 col-form-label">Period :</label>
                        <div className="col-sm-5">
                            <input type="datetime-local" className="form-control" id="startTime" name="startTime" required />
                        </div>
                        <div className="col-sm-5">
                            <input type="datetime-local" className="form-control" id="endTime" name="endTime" required />
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Title :</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" name="title" required />
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label htmlFor="reason" className="col-sm-2 col-form-label">Reason :</label>
                        <div className="col-sm-10">
                            <textarea type="text" className="form-control" id="reason" name="reason" required />
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label htmlFor="pdf" className="col-sm-2 col-form-label">Proof :</label>
                        <div className="col-sm-10">
                            <input type="file" className="form-control-file" id="pdf" name="pdf" accept=".pdf" required />
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <button type="submit" className="btn btn-success w-25" disabled={uploading}>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
    );
};
