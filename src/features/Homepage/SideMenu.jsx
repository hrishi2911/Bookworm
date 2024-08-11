import { useState } from "react";
import MenuList from "./MenuList";
import styled from "styled-components";

function SideMenu({ isLoggedIn }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const arr = [
    "Home",
    "Genre",
    "Lending Library",
    "MyShelf",
    "MyLibrary",
    "MyAccount",
  ];
  const NavArr = [
    "/",
    "/product",
    "/lendinglib",
    "/MyShelf",
    "/MyLibrary",
    "/MyAccount",
  ];

  const handleSelect = (index) => {
    setSelectedIndex(index);
  };
  const isLogin = isLoggedIn || localStorage.getItem("isLogIn");

  return (
    <SideMenuContainer>
      <MenuListUl>
        {isLogin
          ? arr.map((val, index) => (
              <MenuList
                value={val}
                index={index}
                linkTo={NavArr[index]}
                selectedIndex={selectedIndex}
                onSelect={handleSelect}
                key={index}
              />
            ))
          : arr
              .filter((item, index) => index < 3)
              .map((val, index) => (
                <MenuList
                  value={val}
                  index={index}
                  linkTo={NavArr[index]}
                  selectedIndex={selectedIndex}
                  onSelect={handleSelect}
                  key={index}
                />
              ))}
      </MenuListUl>
    </SideMenuContainer>
  );
}

const SideMenuContainer = styled.div`
  width: 250px;
  padding: 10px;
`;

const MenuListUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export default SideMenu;
