import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { getOrders, cancelOrder, markOrderAsDelivered } from '../api';
import { openSnackbar } from '../Redux/reducer/snackbarSlice';

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
    grid-template-columns: 2fr 1fr;
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
  color: ${({ theme, $status }) =>
    $status === 'Cancelled' ? '#FFFFFF' :
      $status === 'Delivered' ? '#FFFFFF' :
        '#806600'  // Dark yellow for 'Payment Done'
  };
  background-color: ${({ theme, $status }) =>
    $status === 'Cancelled' ? '#FF0000' :
      $status === 'Delivered' ? '#008000' :
        '#FFFAE6'  // Light yellow for 'Payment Done'
  };
  padding: 6px 12px;
  border-radius: 20px;
  display: inline-block;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;

  @media (min-width: 768px) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    margin-top: 0;
    justify-content: flex-end;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.3s ease;
`;

const CancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid ${({ theme }) => theme.text_secondary};

  &:hover {
    background-color: ${({ theme }) => theme.text_secondary + '22'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ReplaceButton = styled(Button)`
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.text_primary};
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.primary + 'dd'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;

  @media (min-width: 768px) {
    grid-column: 1 / -1;
    grid-row: 2 / 3;
    margin-top: 0;
  }
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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
`;

const ProductName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ProductQuantity = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
`;

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("Urban-token");
      const response = await getOrders(token);
      setOrders(response.data);
    } catch (error) {
      dispatch(openSnackbar({
        message: "Failed to fetch orders",
        severity: "error",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("Urban-token");
      console.log("Cancelling order:", orderId);
      const response = await cancelOrder(token, orderId);
      console.log("Cancel order response:", response);
      setOrders(prevOrders => prevOrders.map(order =>
        order._id === orderId ? { ...order, status: "Cancelled" } : order
      ));
      dispatch(openSnackbar({
        message: "Order cancelled successfully",
        severity: "success",
      }));
    } catch (error) {
      console.error("Error cancelling order:", error);
      dispatch(openSnackbar({
        message: "Failed to cancel order",
        severity: "error",
      }));
    }
  };

  const handleMarkAsDelivered = async (orderId) => {
    try {
      const token = localStorage.getItem("Urban-token");
      await markOrderAsDelivered(token, orderId);
      setOrders(prevOrders => prevOrders.map(order =>
        order._id === orderId ? { ...order, status: "Delivered" } : order
      ));
      dispatch(openSnackbar({
        message: "Order marked as delivered successfully",
        severity: "success",
      }));
    } catch (error) {
      console.error("Error marking order as delivered:", error);
      dispatch(openSnackbar({
        message: "Failed to mark order as delivered",
        severity: "error",
      }));
    }
  };

  return (
    <Container>
      <Section
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
      >
        <Title>Your Orders</Title>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <OrderList>
            {orders.map((order) => (
              <OrderItem key={order._id}>
                <OrderHeader>
                  <OrderInfo>
                    <OrderId>Order #{order._id}</OrderId>
                    <OrderDate>Placed on: {new Date(order.createdAt).toLocaleDateString()}</OrderDate>
                    <OrderTotal>Total: ${order.total_amount ? parseFloat(order.total_amount.$numberDecimal).toFixed(2) : 'N/A'}</OrderTotal>
                  </OrderInfo>
                  <StatusBadge $status={order.status}>
                    {order.status}
                  </StatusBadge>
                </OrderHeader>
                <ButtonContainer>
                  <CancelButton
                    onClick={() => handleCancelOrder(order._id)}
                    disabled={order.status !== 'Payment Done'}
                  >
                    Cancel Order
                  </CancelButton>
                  <ReplaceButton
                    onClick={() => handleMarkAsDelivered(order._id)}
                    disabled={order.status !== 'Payment Done'}
                  >
                    Mark as Delivered
                  </ReplaceButton>
                </ButtonContainer>
                <ProductInfo>
                  {order.products.map((item) => (
                    <ProductItem key={item._id}>
                      <ProductImage src={item.product.img} alt={item.product.name} />
                      <ProductDetails>
                        <ProductName>{item.product.name}</ProductName>
                        <ProductQuantity>Quantity: {item.quantity}</ProductQuantity>
                      </ProductDetails>
                    </ProductItem>
                  ))}
                </ProductInfo>
              </OrderItem>
            ))}
          </OrderList>
        )}
      </Section>
    </Container>
  );
}

export default Orders;
