import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Signupbgimage.css";

export default function SignUpPage() {
    const [userName, setUserName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState(''); // New state for address
    const [occupation, setOccupation] = useState(''); // New state for occupation
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const obj={userName, 
                    contactNumber, 
                    emailId, 
                    password, 
                    address, // Include address
                    occupation}
                    console.log(obj);
                    
        try {
            await axios.post('http://localhost:8080/signup', { 
                userName, 
                contactNumber, 
                emailId, 
                password, 
                address, // Include address
                occupation // Include occupation
            });
            console.log('Sign-up successful');
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Sign-up failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='Signupbgimage'>
            <form className='formcss' onSubmit={handleSignUp}>
                <h2 className='poppins-semibold'>Sign Up Account</h2>
                <br />
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
