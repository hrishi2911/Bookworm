import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/Signupbgimage.css";

export default function SignUpPage() {
    const [userName, setUserName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [occupation, setOccupation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (phoneNumber) => {
        const re = /^\d{10}$/; // Example for 10 digit number validation
        return re.test(phoneNumber);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(emailId)) {
            setError('Invalid email format.');
            return;
        }

        if (!validatePhoneNumber(contactNumber)) {
            setError('Phone number must be a 10 digit number.');
            return;
        }

        const obj = {
            userName,
            contactNumber,
            emailId,
            password,
            address,
            occupation
        };
        console.log(obj);

        try {
            const response = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(obj)
            });

            if (response.ok) {
                console.log('Sign-up successful');
                navigate('/login');
            } else {
                const errorData = await response.json();
                console.error('Sign-up failed:', errorData);
                setError(errorData.message || 'Sign-up failed');
            }
        } catch (error) {
            console.error('Sign-up failed:', error.message);
            setError('Sign-up failed');
        }
    };

    return (
        <div className='Signupbgimage'>
            <form className='formcss' onSubmit={handleSignUp}>
                <h2 className='poppins-semibold'>Sign Up Account</h2>
                <br />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div>
                    <input 
                        type="text" 
                        id="userName" 
                        value={userName} 
                        onChange={(e) => setUserName(e.target.value)} 
                        name="userName" 
                        placeholder='UserName' 
                        required 
                    />
                </div>
                <br />
                <div>
                    <input 
                        type="text" 
                        id="contactNumber" 
                        value={contactNumber} 
                        onChange={(e) => setContactNumber(e.target.value)} 
                        name="contactNumber" 
                        placeholder='Phone Number' 
                        required 
                    />
                </div>
                <br />
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
                <div>
                    <input 
                        type="text" 
                        id="address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        name="address" 
                        placeholder='Address' 
                        required 
                    />
                </div>
                <br />
                <div>
                    <input 
                        type="text" 
                        id="occupation" 
                        value={occupation} 
                        onChange={(e) => setOccupation(e.target.value)} 
                        name="occupation" 
                        placeholder='Occupation' 
                        required 
                    />
                </div>
                <br />
                <a className='p_signup' href='/login'>Already a member?</a>
                <br />
                <br />
                <button type="submit" className='rubik' style={{ fontSize: 32 }} onClick={handleSignUp}>Sign Up</button>
            </form>
        </div>
    );
}
