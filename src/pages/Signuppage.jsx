import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signupbgimage.css";
import { useHomeBack } from "../hooks/useMoveBack";
import HomeButton from "../ui/HomeButton";

export default function SignUpPage() {
  const [customerName, setcustomerName] = useState("");
  const [customerPhone, setcustomerPhone] = useState("");
  const [customerEmail, setcustomerEmail] = useState("");
  const [customerPassword, setCustomerPassword] = useState("");
  const [customerAddress, setAddress] = useState("");
  const [customerOccupation, setcustomerOccupation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const homeBack = useHomeBack();

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
    setError("");

    if (!validateEmail(customerEmail)) {
      setError("Invalid email format.");
      return;
    }

    if (!validatePhoneNumber(customerPhone)) {
      setError("Phone number must be a 10 digit number.");
      return;
    }

    const obj = {
      customerName,
      customerPhone,
      customerEmail,
      customerPassword,
      customerAddress,
      customerOccupation,
    };
    console.log(obj);

    try {
      const response = await fetch(
        "http://localhost:8080/api/customers/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );

      if (response.ok) {
        console.log("Sign-up successful");
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.error("Sign-up failed:", errorData);
        setError(errorData.message || "Sign-up failed");
      }
    } catch (error) {
      console.error("Sign-up failed:", error.message);
      setError("Sign-up failed");
    }
  };

  return (
    <div className="Signupbgimage">
      <form className="formcss" onSubmit={handleSignUp}>
        <HomeButton onClick={homeBack} />
        <h2 className="poppins-semibold">Sign Up Account</h2>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setcustomerName(e.target.value)}
            name="customerName"
            placeholder="customerName"
            required
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            id="customerPhone"
            value={customerPhone}
            onChange={(e) => setcustomerPhone(e.target.value)}
            name="customerPhone"
            placeholder="Phone Number"
            required
          />
        </div>
        <br />
        <div>
          <input
            type="email"
            id="customerEmail"
            value={customerEmail}
            onChange={(e) => setcustomerEmail(e.target.value)}
            name="customerEmail"
            placeholder="Email"
            required
          />
        </div>
        <br />
        <div>
          <input
            type="password"
            id="customerPassword"
            value={customerPassword}
            onChange={(e) => setCustomerPassword(e.target.value)}
            name="customerPassword"
            placeholder="Password"
            required
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            id="customerAddress"
            value={customerAddress}
            onChange={(e) => setAddress(e.target.value)}
            name="customerAddress"
            placeholder="Address"
            required
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            id="customerOccupation"
            value={customerOccupation}
            onChange={(e) => setcustomerOccupation(e.target.value)}
            name="customerOccupation"
            placeholder="customerOccupation"
            required
          />
        </div>
        <br />
        <a className="p_signup" href="/login">
          Already a member?
        </a>
        <br />
        <br />
        <button
          type="submit"
          className="rubik"
          style={{ fontSize: 32 }}
          onClick={handleSignUp}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
