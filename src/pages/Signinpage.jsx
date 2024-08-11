import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Signupbgimage.css";
import HomeButton from "../ui/HomeButton";
import { useHomeBack } from "../hooks/useMoveBack";

export default function SignInPage({ setIsLoggedIn }) {
  const [customerEmail, setcustomerEmail] = useState("");
  const [customerPassword, setcustomerPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const homeBack = useHomeBack();

  const validateEmail = (customerEmail) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(customerEmail).toLowerCase());
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(customerEmail)) {
      setError("Invalid email format.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/customers/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ customerEmail, customerPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // Store authentication token or user info if needed
        // Redirect to homepage
        localStorage.setItem("custId", data.customer.customerId);
        sessionStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        localStorage.setItem("isLogIn", true);
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        setError(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Login failed");
    }
  };

  return (
    <div className="Signupbgimage">
      <form className="formcss" onSubmit={handleSignIn}>
        <HomeButton onClick={homeBack} />
        <h2 className="poppins-semibold">Login Account</h2>
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
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
            onChange={(e) => setcustomerPassword(e.target.value)}
            name="customerPassword"
            placeholder="Password"
            required
          />
        </div>
        <br />
        <a className="p_signup" onClick={() => navigate("/signup")}>
          Not a member?
        </a>
        <br />
        <br />
        <button type="submit" className="rubik" style={{ fontSize: 32 }}>
          Login
        </button>
      </form>
    </div>
  );
}
