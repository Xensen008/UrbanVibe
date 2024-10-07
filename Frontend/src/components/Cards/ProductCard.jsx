import React from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { circularProgressClasses } from '@mui/material';
import { AddShoppingCartRounded, FavoriteRounded } from '@mui/icons-material';
import { AddShoppingCartOutlined } from '@mui/icons-material';

const Image = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 6px;
  object-fit: cover;
  transition: all 0.3s ease-out;
`

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


const Menu = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  top: 14px;
  right: 14px;
  display: none;
  flex-direction: column;
  gap: 12px;
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
  }
  &:hover ${Image}{
    opacity: 0.8;
  }
  &:hover ${Menu}{
    display: flex;
  }
`

const Rate = styled.div`
  position: absolute;
  bottom: 8px;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  left: 8px;
  background: white;
  border-radius: 4px;
  padding: 4px 8px;
  opacity: 0.8;
`
const Details = styled.div`
  display: flex;
  gap: 6px;
  padding: 4px 10px;
  flex-direction: column;

`
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};  

`
const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_Primary};  
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};  
  @media (max-width: 768px) {
    font-size: 16px;
    gap: 6px;
  }
`
const Span = styled.span`
  font-size: 17px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary};  
  text-decoration: line-through;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`
const Percentage = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: green ;
  @media (max-width: 768px) {
    font-size: 14px;
  }

`
const MenuItem = styled.div`
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background: white;
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`
function ProductCard() {
    return (
        <Card>
            <Top>
                <Image src="https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/24439364/2023/8/10/a157968c-bc17-4fa8-b805-31f930c47b381691681709790MenBlackSolidSlimFitFormalBlazer1.jpg"/>
                <Menu>
                  <MenuItem>
                    <FavoriteRounded sx={{fontSize:" 20px" , color: 'red'}} />
                  </MenuItem>
                  <MenuItem>
                    <AddShoppingCartOutlined sx={{fontSize: "20px", color: 'inherit'}} onClick={() => addCart(Product?.id)} />
                  </MenuItem>
                </Menu>
                <Rate>
                    <Rating value={3} sx={{fontSize: 14}} />
                </Rate>
            </Top>
            <Details>
                <Title>
                    Title
                </Title>
                <Desc>
                    Description
                </Desc>
                <Price>
                    $1200  <Span> $1500</Span> <Percentage>20% off</Percentage>
                </Price>
            </Details>
        </Card>
    )
}

export default ProductCard