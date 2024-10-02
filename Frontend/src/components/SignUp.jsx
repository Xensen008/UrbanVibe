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
  color: ${({ theme }) => theme.primary};
`
const Span = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary + 90};
`

function SignUp() {
  return (
    <Container>
      <div>
        <Title>
          Create New Account
        </Title>
        <Span>
          Sign up to continue
        </Span>
      </div>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <TextInput
          label="Name"
          type="text"
          placeholder="Enter your Name"
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your email address"
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        <Button text="Create Account" />
      </div>
    </Container>
  )
}

export default SignUp