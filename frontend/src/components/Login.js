import React, { useState, useEffect } from 'react';
import axios from './axios';
import ForgotPassword from './Forgot_password';
import LoginAct from './LoginAct';
import './Login.css'; // Import your CSS file here
export default function Login() {
  // use states for the form inputs
  
    return (
        <div className='login-page'>
           
<LoginAct/>
{/* Forgot password goes here  */}

{/* forgot password component */}
{/* <ForgotPassword /> */}

        </div>
    );
}

