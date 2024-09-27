import React, { useState } from "react";
import styled from "styled-components";
import { Menu, X, Search, User, ShoppingBag } from "@styled-icons/feather";


const Nav = styled.nav`
  background-color: white;
  color: black;
  padding: 1rem 1.5rem;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

const NavLinks = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    gap: 2rem;
  }
`;

const NavLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  &:hover {
    text-decoration: underline;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
`;

const StyledIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
`;

const MobileMenuButton = styled(IconButton)`
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo href="/">LOGO</Logo>

        <NavLinks>
          <NavLink href="/women">WOMEN</NavLink>
          <NavLink href="/men">MEN</NavLink>
          <NavLink href="/kids">KIDS</NavLink>
          <NavLink href="/sale">SALE</NavLink>
        </NavLinks>

        <IconsContainer>
          <IconButton aria-label="Search">
            <StyledIcon as={Search} />
          </IconButton>
          <IconButton aria-label="User Account">
            <StyledIcon as={User} />
          </IconButton>
          <IconButton aria-label="Shopping Bag">
            <StyledIcon as={ShoppingBag} />
          </IconButton>
          <MobileMenuButton aria-label="Menu" onClick={toggleMenu}>
            <StyledIcon as={isMenuOpen ? X : Menu} />
          </MobileMenuButton>
        </IconsContainer>
      </NavContainer>

      {isMenuOpen && (
        <MobileMenu>
          <NavLink href="/women">WOMEN</NavLink>
          <NavLink href="/men">MEN</NavLink>
          <NavLink href="/kids">KIDS</NavLink>
          <NavLink href="/sale">SALE</NavLink>
        </MobileMenu>
      )}
    </Nav>
  );
}