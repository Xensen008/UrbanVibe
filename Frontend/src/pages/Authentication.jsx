import { Modal } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import AuthImage from "../utils/Images/AuthImage.png"
import LogoImage from '../utils/Images/Logosemi.png'
import CloseIcon from '@mui/icons-material/Close';
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.bg};
`
const Left = styled.div`
  flex: 1;
  position: relative;
  background-color: rgb(235, 235, 235);
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const Right = styled.div`
  flex: 0.9;
  position: relative; 
  // background-color: blue;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  gap: 16px;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex: 1;
  }
`
const Logo = styled.img`
  height: 65px;
  postion: absolute;
  width: auto;
  margin-left: 40px;
  margin-top: 5px;
  @media screen and (max-width: 768px) {
    height: 50px;   
  }
`
const Image = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  bottom: 50px;
  object-fit: cover;
  left: 3px;
`
const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  height: 22px;
  width: 22px;
  color: ${({ theme }) => theme.text};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.primary + 50};
  }
`
const Text = styled.p`
  display: flex;
  gap: 15px;
  font-size: 16px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  font-weight: 500;
  @media (max-width: 400px) {
    font-size: 14px;
    font-weight: 400;
  }
`
const TextButton = styled.div`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
`
function Authentication({ openAuth, setOpenAuth }) {
  const [login, setLogin] = React.useState(true)
  return (
    <Modal open={openAuth}>
      <Container>
        <Left>
          <Logo src={LogoImage}/>
          <Image src={AuthImage}/>
        </Left>
        <Right>
          <CloseButton>
            <CloseIcon onClick={()=>setOpenAuth(false)} />
          </CloseButton>
          {login ? 
          <>
            <SignIn/>
            <Text> Don't have an Account ?<TextButton onClick={()=>setLogin(false)}>Sign Up</TextButton></Text>
          </> : 
          <>
            <SignUp/>
            <Text> Already have an account ?<TextButton onClick={()=>setLogin(true)}>Sign In</TextButton></Text>
          </>}  
        </Right>
      </Container>
    </Modal>
  )
}

export default Authentication