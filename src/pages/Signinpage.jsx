import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Signupbgimage.css";

export default function SignInPage() {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/customers/login', { customerEmail: emailId, customerPassword: password });
            console.log('Login successful:', response.data);
            // Store authentication token or user info if needed
            // Redirect to homepage
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='Signupbgimage'>
            <form className='formcss' onSubmit={handleSignIn}>
                <h2 className='poppins-semibold'>Login Account</h2>
                <br />
                <div>
                    <input type="email" id="emailId" value={emailId} onChange={(e) => setEmailId(e.target.value)} name="emailId" placeholder='Email' required />
                </div>
                <br />
                <div>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder='Password' required />
                </div>
                <br />
                <a className='p_signup' href='/signup'>Not a member?</a>
                <br />
                <br />
                <button type="submit" className='rubik' style={{ fontSize: 32 }} onclick={handleSignIn}>Login</button>
            </form>
        </div>
    );
}
