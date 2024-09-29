import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { NavLink } from 'react-router-dom'
import { SearchRounded, FavoriteBorder, ShoppingCartOutlined } from '@mui/icons-material'
import LogoImage from '../utils/Images/Logosemi.png'
import { MenuRounded } from '@mui/icons-material'

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
  height: 65px;
  width: auto;
  margin-left: 40px;
  margin-top: 5px;
  @media screen and (max-width: 768px) {
    height: 50px;   
  }
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
const MobileIcon = styled.div`
  color: ${({ theme }) => theme.text_primary};
  display: none;
  @media screen and (max-width:768px) {
    display: flex;
    align-items: center;
}
`
const Mobileicon = styled.div`
  display: none;
  @media screen and (max-width:768px) {
    display: flex;
    align-items: center;
    gap: 15px;
}
`
const MobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 15px;
  padding: 0 6px;
  list-style: none;
  width: 84%;
  padding: 12px 40px 24px 40px;
  background-color: ${({ theme }) => theme.card_light + 99};
  position: absolute;
  top: 60px;
  right: 0;
  transition: all 0.5s ease-in-out; 
  transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.2); 
  opacity: ${({ isOpen }) => isOpen ? '100%' : '0'};
  z-index: ${({ isOpen }) => isOpen ? '1000' : '-1000'};
`

function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Nav>
      <NavbarContainer>
        <MobileIcon  onClick={()=> setIsOpen(!isOpen)} >
          <MenuRounded style={{ color: "inherit" }} />
        </MobileIcon>

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

      {isOpen && (
        <MobileMenu isOpen={isOpen}>
          <li><Navlink to="/"  onClick={()=> setIsOpen(!isOpen)} end>Home</Navlink></li>
          <li><Navlink to="/Shop"  onClick={()=> setIsOpen(!isOpen)} >Shop</Navlink></li>
          <li><Navlink to="/New-Arrival"  onClick={()=> setIsOpen(!isOpen)} >New Arrival</Navlink></li>
          <li><Navlink to="/orders"  onClick={()=> setIsOpen(!isOpen)} >Orders</Navlink></li>
          <li><Navlink to="/Contact-us"  onClick={()=> setIsOpen(!isOpen)} >Contact us</Navlink></li>

          <div
            style={{
              flex: 1,
              display: "flex",
              gap: "12px",
            }}
          
          >
             <Button text="Sign Up" outlined small  /> 
            <Button text="Sign In" small />
          </div>
        </MobileMenu>
      )}

        <Mobileicon>
          <Navlink to="/search">
            <SearchRounded sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
          <Navlink to="/Wishlist">
            <FavoriteBorder sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
          <Navlink to="/Cart">
            <ShoppingCartOutlined sx={{ color: "inherit", fontSize: "28px" }} />
          </Navlink>
        </Mobileicon>

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