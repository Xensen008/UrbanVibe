import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Star } from '@styled-icons/feather/Star'

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.bg};
`;

const Section = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
`;

const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const OrderItem = styled.div`
  background: ${({ theme }) => theme.card_light};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 20px;
    align-items: center;
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
`;

const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const OrderId = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const OrderDate = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

const OrderTotal = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const StatusBadge = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${getStatusColor};
  background-color: ${getStatusBgColor};
  padding: 6px 12px;
  border-radius: 20px;
  display: inline-block;
`;

const ProgressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (min-width: 768px) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
  }
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 4px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${({ progress }) => progress}%;
  height: 100%;
  background-color: ${getStatusColor};
  transition: width 0.3s ease;
`;

const ProgressText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  min-width: 45px;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;

  @media (min-width: 768px) {
    grid-column: 3 / 4;
    grid-row: 1 / 2;
    margin-top: 0;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_secondary};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.text_secondary + '20'};
  }
`;

const ReplaceButton = styled(Button)`
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.primary + 'dd'};
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 16px;

  @media (min-width: 768px) {
    grid-column: 1 / -1;
    grid-row: 2 / 3;
    margin-top: 0;
  }
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ProductName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StarIcon = styled(Star)`
  width: 16px;
  height: 16px;
  color: #ffc107;
`;

const Rating = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

function getStatusColor({ status }) {
  switch (status) {
    case 'Processing': return '#FFA500';
    case 'Shipped': return '#3498db';
    case 'Delivered': return '#2ecc71';
    case 'Cancelled': return '#e74c3c';
    default: return '#95a5a6';
  }
}

function getStatusBgColor({ status }) {
  switch (status) {
    case 'Processing': return '#FFF3E0';
    case 'Shipped': return '#E3F2FD';
    case 'Delivered': return '#E8F5E9';
    case 'Cancelled': return '#FFEBEE';
    default: return '#ECEFF1';
  }
}

function Orders() {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const mockOrders = [
    { id: '1234', date: '2023-05-15', status: 'Delivered', total: 120.99, progress: 100, productName: 'Wireless Headphones', rating: 4.5, image: 'https://imgs.search.brave.com/4szZIc7ys7OvFi8xoIH1ac-aEIOUcOKTx1PEUA-jwwA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmRhbmEtZmFyYmVy/Lm9yZy9pbnNpZ2h0/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzAzL21hbHRlLXdp/bmdlbi0zODIxNDgt/dW5zcGxhc2gtMS5q/cGc' },
    { id: '5678', date: '2023-05-10', status: 'Shipped', total: 89.50, progress: 75, productName: 'Smart Watch', rating: 4.2, image: 'https://imgs.search.brave.com/4szZIc7ys7OvFi8xoIH1ac-aEIOUcOKTx1PEUA-jwwA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmRhbmEtZmFyYmVy/Lm9yZy9pbnNpZ2h0/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzAzL21hbHRlLXdp/bmdlbi0zODIxNDgt/dW5zcGxhc2gtMS5q/cGc' },
    { id: '9101', date: '2023-05-05', status: 'Processing', total: 210.75, progress: 25, productName: 'Laptop', rating: 4.8, image: 'https://imgs.search.brave.com/4szZIc7ys7OvFi8xoIH1ac-aEIOUcOKTx1PEUA-jwwA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmRhbmEtZmFyYmVy/Lm9yZy9pbnNpZ2h0/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzAzL21hbHRlLXdp/bmdlbi0zODIxNDgt/dW5zcGxhc2gtMS5q/cGc' },
    { id: '1112', date: '2023-05-01', status: 'Cancelled', total: 45.00, progress: 0, productName: 'Phone Case', rating: 3.9, image: 'https://imgs.search.brave.com/4szZIc7ys7OvFi8xoIH1ac-aEIOUcOKTx1PEUA-jwwA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LmRhbmEtZmFyYmVy/Lm9yZy9pbnNpZ2h0/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzAzL21hbHRlLXdp/bmdlbi0zODIxNDgt/dW5zcGxhc2gtMS5q/cGc' },
  ];

  return (
    <Container>
      <Section
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <Title>Your Orders</Title>
        <OrderList>
          {mockOrders.map((order) => (
            <OrderItem key={order.id}>
              <OrderHeader>
                <OrderInfo>
                  <OrderId>Order #{order.id}</OrderId>
                  <OrderDate>Placed on: {order.date}</OrderDate>
                  <OrderTotal>Total: ${order.total.toFixed(2)}</OrderTotal>
                </OrderInfo>
                <StatusBadge status={order.status}>{order.status}</StatusBadge>
              </OrderHeader>
              <ProgressContainer>
                <ProgressBar>
                  <Progress progress={order.progress} status={order.status} />
                </ProgressBar>
                <ProgressText>{order.progress}%</ProgressText>
              </ProgressContainer>
              <ButtonContainer>
                <CancelButton disabled={order.status === 'Delivered' || order.status === 'Cancelled'}>
                  Cancel Order
                </CancelButton>
                <ReplaceButton disabled={order.status !== 'Delivered'}>
                  Replace Order
                </ReplaceButton>
              </ButtonContainer>
              <ProductInfo>
                <ProductImage src={order.image} alt={order.productName} />
                <ProductDetails>
                  <ProductName>{order.productName}</ProductName>
                  <RatingContainer>
                    <StarIcon />
                    <Rating>{order.rating.toFixed(1)}</Rating>
                  </RatingContainer>
                </ProductDetails>
              </ProductInfo>
            </OrderItem>
          ))}
        </OrderList>
      </Section>
    </Container>
  )
}

export default Orders