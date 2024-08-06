import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Signupbgimage.css";

export default function SignInPage() {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(emailId)) {
            setError('Invalid email format.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/customers/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ customerEmail: emailId, customerPassword: password })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                // Store authentication token or user info if needed
                // Redirect to homepage
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                setError(errorData.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login failed:', error.message);
            setError('Login failed');
        }
    };

    return (
        <div className='Signupbgimage'>
            <form className='formcss' onSubmit={handleSignIn}>
                <h2 className='poppins-semibold'>Login Account</h2>
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <input
                        type="email"
                        id="emailId"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        name="emailId"
                        placeholder='Email'
                        required
                    />
                </div>
                <br />
                <div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        placeholder='Password'
                        required
                    />
                </div>
                <br />
                <a className='p_signup' href='/signup'>Not a member?</a>
                <br />
                <br />
                <button type="submit" className='rubik' style={{ fontSize: 32 }}>Login</button>
            </form>
        </div>
    );
}
