import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { NavLink } from 'react-router-dom'
import { SearchRounded, FavoriteBorder, ShoppingCartOutlined } from '@mui/icons-material'
import LogoImage from '../utils/Images/Logosemi.png'

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.bg};
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.0rem;
  position: sticky;
  top: 0;
  z-index: 10;
  color: white;
`

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  font-size: 1.0rem;
`

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  padding: 0 6px;
`

const Logo = styled.img`
  height: 40px; // Adjust this value as needed
  width: auto;
`

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding: 0 6px;
  list-style: none;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 0 6px;
  color: ${({ theme }) => theme.text_primary}; 
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Navlink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  font-size: 1.0rem;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.text_secondary};
    transition: width 0.3s ease-in-out;
  }
  
  &:hover {
    color: ${({ theme }) => theme.text_secondary};
    &::after {
      width: 100%;
    }
  }
  
  &.active {
    color: ${({ theme }) => theme.text_secondary};
    &::after {
      width: 100%;
    }
  }
`

function Navbar() {
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo>
          <Logo src={LogoImage} alt="UrbanVibes Logo" />
        </NavLogo>
        <NavItems>
          <li><Navlink to="/" end>Home</Navlink></li>
          <li><Navlink to="/Shop">Shop</Navlink></li>
          <li><Navlink to="/New-Arrival">New Arrival</Navlink></li>
          <li><Navlink to="/orders">Orders</Navlink></li>
          <li><Navlink to="/Contact-us">Contact us</Navlink></li>
        </NavItems>
        <ButtonContainer>
          <Navlink to="/search">
            <SearchRounded sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
          <Navlink to="/Wishlist">
            <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
          <Navlink to="/Cart">
            <ShoppingCartOutlined sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
          <Button text="Sign In" small />
        </ButtonContainer>
      </NavbarContainer>
    </Nav>
  )
}

export default Navbar