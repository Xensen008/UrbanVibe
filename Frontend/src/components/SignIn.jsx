import React from 'react'
import styled from 'styled-components'
import TextInput from './TextInput'
import Button from './Button'

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 36px;
`
const Title = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({theme}) => theme.primary};
`
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.text_secondary + 90};
`
const TextButton = styled.div`
  font-size: 16px;
  font-weight: 400;
  text-align: right;
  color: ${({theme}) => theme.text_secondary + 90};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
function Signin() {
  return (
    <Container>
      <div>
        <Title>
            Welcome to UrbanVibes
        </Title>
        <Span>
            Sign in to continue
        </Span>
      </div>
      <div style={{display:"flex", gap:"20px", flexDirection:"column"}}>
          <TextInput
            label = "Email Address"
            placeholder = "Enter your email address"
          />
          <TextInput
            label = "Password"
            placeholder = "Enter your password" 
            type = "password"
          />
          <TextButton>Forgot Password?</TextButton>
          <Button text="Login" />
      </div>
    </Container>
  )
}

export default Signin