import React from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";

const ButtonContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  color: white;
  border: 1.8px solid ${({ theme }) => theme.primary};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.primary};
  padding: 10px 16px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s ease;
  ${({ full }) => full && `
    width: 100%;
  `}
  ${({ outlined, theme }) => outlined && `
    color: ${theme.primary};
    background-color: transparent;
    &:hover {
      color: ${theme.text_primary};
      background-color: ${theme.primary};
    }
  `}
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Button = ({ text, leftIcon, rightIcon, onClick, isLoading, outlined, full, ...props }) => {
  return (
    <ButtonContainer onClick={onClick} outlined={outlined} full={full} {...props}>
      {isLoading ? (
        <CircularProgress size={24} color="inherit" />
      ) : (
        <>
          {leftIcon && <div style={{ marginRight: '8px' }}>{leftIcon}</div>}
          {text}
          {rightIcon && <div style={{ marginLeft: '8px' }}>{rightIcon}</div>}
        </>
      )}
    </ButtonContainer>
  )
}

export default Button
