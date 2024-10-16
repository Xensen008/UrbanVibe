import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  text-align: center;
`;

const Message = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.text_primary};
`;

const AuthPrompt = ({ setOpenAuth }) => {
    return (
        <Container>
            <Message>Please log in or create an account to continue</Message>
            <Button
                text="Sign Up"
                small
                onClick={() => setOpenAuth(true)}
            />
        </Container>
    );
};

export default AuthPrompt;
