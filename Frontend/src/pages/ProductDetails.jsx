import React from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import Button from '../components/Button'
import { FavoriteRounded } from '@mui/icons-material'
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 99%;
  overflow-y: scroll;
  
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  width: 100%;
  padding: 12px;
  gap: 32px;
  @media (max-width: 750px) {
    flex-direction: column;
    justify-content: center;
  }
`;
const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
  @media (max-width: 750px) {
    height: 300px;
    // margin-top: 80px;
  }
`;

const Details = styled.div`
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 4px 10px;
  flex: 1;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;
const Name = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;
const Percent = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: green;
`;

const Sizes = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Items = styled.div`
  display: flex;
  gap: 12px;
`;
const Item = styled.div`
  border: 1px solid ${({ theme }) => theme.primary};
  font-size: 14px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ selected, theme }) =>
    selected &&
    `
  background: ${theme.primary};
  color: white;
  `}
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 32px 0px;
`;

function ProductDetails() {
  return (
    <Container>
      <Wrapper>
        <ImageWrapper>
          <Image src='https://jaxsonmaximus.com/wp-content/uploads/2020/04/34394c211f01e58539f91e79e6ce1420.jpg' />
        </ImageWrapper>
        <Details>
          <div>
            <Title>Demo</Title>
            <Name>Demo</Name>
          </div>
          <Rating value={4} />
          <Price>
            $120 <Span>150</Span><Percent>40% off</Percent>
          </Price>
          <Desc>Description of the product Lorem, ipsum dolor sit amet consectetur adipisicing elit.</Desc>
          <Sizes>
          <Items>
            <Item selected>S</Item>
            <Item>M</Item>
            <Item>L</Item>
            <Item>XL</Item>
          </Items>
        </Sizes>
        <ButtonWrapper>
          <Button full outlined text='Add to cart' />
          <Button full text='Buy Now' />
          <Button full outlined leftIcon={<FavoriteRounded sx={{ color: "red", fontSize: "22px" }} />} />
        </ButtonWrapper>
        </Details>
      </Wrapper>
    </Container>
  )
}

export default ProductDetails