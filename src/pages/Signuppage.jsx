import { useState } from "react";
import "../css/Signupbgimage.css";
export default function Signuppage() {
    const [userName, setUserName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');


    const handleSignin = async () => {
        try {
            console.log('Username:', userName);
            console.log('Contact Number:', contactNumber);
            console.log('Email ID:', emailId);
            console.log('Password:', password);
            const response = await axios.post('http://localhost:8080/bookworm/signIn', { userName, contactNumber, emailId, password });
            console.log('Login successful:', response.data);
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='Signupbgimage' >
            <form className='formcss'>
                <h2 className='poppins-semibold'> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Login Account</h2>
                <br />
                <div>
                    <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} name="userName" placeholder='            UserName' required />
                </div>
                <br />
                <div>
                    <input type="text" id="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} name="contactNumber" placeholder='            Phone Number' required />
                </div>
                <br />
                <div>
                    <input type="text" id="emailId" value={emailId} onChange={(e) => setEmailId(e.target.value)} name="emailId" placeholder='            Email' required />
                </div>
                <br />
                <div>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder='            Password' required />
                </div>
                <br />
                <a className='p_signup' href='Login.js' target='_Blank'>Already a member?</a>
                <br />
                <br />
                <input type="submit" className='rubik' value="S   I   G   N   I   N" style={{ fontSize: 32 }} onClick={handleSignin} />
            </form>
        </div>
    );
}