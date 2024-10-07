import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';


const Card = styled.div`
  width: 220px; 
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 175px;
  }
`

const Image = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 6px;
  object-fit: cover;
  transition: all 0.3s ease-out;
`

const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  position: relative;
  transition: all 0.3s ease-out;
  &:hover{
    background-color: ${({ theme }) => theme.primary};
    transform: scale(1.05);
  }
  &:hover ${Image}{
    opacity: 0.8;
  }
`

const Menu = styled.div`
  width: 90%;
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  bottom: 20px;
  left: 50;
  right: 50;
  display: flex;
  gap: 10px;
`
const Button = styled.button`
  width: 100%;
  color: ${({ theme }) => theme.text_primary};
  padding: 12px 20px;
  background-color: white;
  border-radius: 12px;
  text-align: center;
  font-weight: 500;
  border: none;
`
const Sale = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  top: 10px;
  right: 10px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: green;
  padding: 3px 6px;
  border-radius: 4px;
`


function ProductCategoryCard({ category }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => {
      navigate(`/shop?category=${category.name}`)
    }}>
      <Top>
        <Image src={category.img} />
        <Menu>
          <Button>
            {category.name}
          </Button>
        </Menu>
        <Sale>{category.off}</Sale>
      </Top>
    </Card>
  )
}

export default ProductCategoryCard