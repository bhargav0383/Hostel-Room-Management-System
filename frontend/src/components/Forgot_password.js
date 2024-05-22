import React, { useState } from 'react';
import axios from './axios';

function ForgotPassword({ showModal, closeModal }) {
    const [id_forgot, setId_forgot] = useState({
        email_id: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setId_forgot({ ...id_forgot, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('Please wait...');

        axios.post('/login/forgot_password', id_forgot)
            .then((res) => {
                console.log("forgot_password: ", res.data);
                if (res.status === 200) {
                    // Password recovery email sent successfully
                    setSuccessMessage('Password sent to your email.');
                    closeModal(); // Close the modal after successful submission
                }
            })
            .catch((error) => {
                console.log("Error:", error.response);
                if (error.response.status === 404) {
                    // Email ID not found in the database
                    setErrorMessage('Email ID not found. Please check your email ID.');
                    setSuccessMessage(''); // Clear success message
                } else {
                    setErrorMessage('Failed to send password recovery email. Please try again later.');
                }
            });
    }

    return (
        <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Forgot Password</h5>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email_id" className="form-label">Enter your registered ID (Password will be sent to this email)</label>
                                <input type="email" className="form-control" id="email_id" name="email_id" value={id_forgot.email_id} onChange={handleChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Send Password</button>
                            {errorMessage && <div className="alert alert-danger mt-3" role="alert">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success mt-3" role="alert">{successMessage}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;
