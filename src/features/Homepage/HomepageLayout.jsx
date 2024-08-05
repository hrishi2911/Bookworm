import styled from "styled-components";
import LogButton from "../../ui/LogButton";
function HomepageLayout() {
  const isLoggedIn = true;

  return (
    <>
      <HSection>
        <img src="./HeaderBg.svg" />
        <HContent>
          <Head1>
            <div>
              <h3>
                Book<span>Worm</span>
              </h3>
            </div>
            <div>
              {isLoggedIn ? (
                <LogButton value="Log Out" />
              ) : (
                <LogButton value="Log In" />
              )}
            </div>
          </Head1>
          <Head2>
            <h1>YOUR NEXT ADVENTURE IS JUST A CLICK AWAY !</h1>
          </Head2>
          <Head3>
            <input placeholder="Search by book name,author or isbn" />
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