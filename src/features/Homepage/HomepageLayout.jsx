import styled from "styled-components";
import LogButton from "../../ui/LogButton";
import { Link, useNavigate } from "react-router-dom";
import CartOverview from "../Cart/CartOverview";

function HomepageLayout({
  searchTerm,
  setSearchTerm,
  isLoggedIn,
  setIsLoggedIn,
}) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear authentication tokens or data
    setIsLoggedIn(false);
    localStorage.removeItem("isLogIn");
    localStorage.removeItem("custId");
    sessionStorage.clear();
    // Optionally, redirect to login page
    navigate("/login"); // Redirect to login page after logout
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const isLogin = isLoggedIn || localStorage.getItem("isLogIn");
  return (
    <>
      <HSection>
        <img src="./HeaderBg.svg" />
        <HContent>
          <Head1>
            <div>
              <img
                src={"./public/Logo.png"}
                alt="Main Logo"
                style={{
                  position: "absolute",
                  width: "189px",
                  height: "58px",
                  /* left: 137px; */
                  top: "30px",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                gap: "30px",
                alignItems: "center",
              }}
            >
              <CartOverview />
              {isLogin ? (
                // <button onClick={handleLogout}>
                <LogButton value="Log Out" handleLogout={handleLogout} />
              ) : (
                // </button>
                <Link to="/login">
                  <LogButton value="Log In" />
                </Link>
              )}
            </div>
          </Head1>
          <Head2>
            <h1>YOUR NEXT ADVENTURE IS JUST A CLICK AWAY !</h1>
          </Head2>
          <Head3>
            <input
              placeholder="Search by book name, author or isbn"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Head3>
          <Head4>
            <div>
              <p>
                <em>Find your favourite book here</em>
              </p>
            </div>
          </Head4>
        </HContent>
      </HSection>
    </>
  );
}

const HSection = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 20px;
  img {
    height: 400px; /* Change to relative */
    width: 100%;
    display: block;
    object-fit: cover;
  }
`;
const HContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 40px 140px;
  width: calc(100% - 312px);
  z-index: 10;
`;
const Head1 = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  div h3 span {
    color: blue;
  }
`;
const Head2 = styled.div`
  h1 {
    font-size: 56px;
    font-weight: 700;
    width: 900px;
    padding: 10px;
  }
`;
const Head3 = styled.div`
  padding: 10px;
  input {
    width: 250px;
    padding: 12px;
  }
`;
const Head4 = styled.div`
  p {
    padding: 10px;
    font-weight: bold;
  }
`;

export default HomepageLayout;
