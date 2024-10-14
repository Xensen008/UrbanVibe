import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { addToCart, deleteFromCart, getCart, placeOrder } from "../api";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../Redux/reducer/snackbarSlice";
import { DeleteOutline } from "@mui/icons-material";
// Styled components
const Container = styled.div`
  padding: 2px 44px;
  height: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  overflow-x: hidden;
  @media (max-width: 768px) {
    padding: 2px 20px;
    height: auto;
    gap: 10px;
    min-height: 100%;
    overflow-x: hidden; // Prevent horizontal scrolling
  }
`;
const Section = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 10px 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  gap: 18px;
  @media (max-width: 750px) {
    margin-bottom: 100px;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 12px;

  @media (max-width: 750px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 750px) {
    flex: 1.2;
  }
`;

const Table = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: ${({ head }) => head && '22px'};
  @media (max-width: 750px) {
    gap: 25px;
    flex-wrap: wrap; 
    justify-content: space-between;
  }
`;

const TableItem = styled.div`
${({ flex }) => flex && 'flex: 1;'}
${({ bold }) =>
    bold &&
    `
  font-weight: 600;
  font-size: 17px;
`}
@media (max-width: 750px) {
  ${({ flex }) => flex && 'align-items: flex-start;'}
}
`;

const Counter = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.text_secondary + '40'};
  border-radius: 8px;
  padding: 4px 12px;
`;

const Product = styled.div`
  display: flex;
  gap: 16px;

  @media (max-width: 750px) {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
`;

const Img = styled.img`
  height: 80px;
  @media (max-width: 750px) {
    height: 60px;
    margin-bottom: 8px;
  }
`;

const Details = styled.div`
  @media (max-width: 750px) {
    text-align: start;
    padding-left: 10px;
    width: 100%;
  }
`;

const ProTitle = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 500;
`;

const ProDesc = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  @media (max-width: 750px) {
    white-space: normal;
    max-width: 100%;
  }
`;

const ProSize = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 750px) {
    flex: 0.8;
  }
`;

const Subtotal = styled.div`
  font-size: 22px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
`;

const Delivery = styled.div`
  font-size: 18px;
  font-weight: 500;
  display: flex;
  gap: 6px;
  flex-direction: column;
`;


function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [buttonLoad, setButtonLoad] = useState(false);

  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    completeAddress: "",
  });

  const getProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("Urban-token");
    await getCart(token).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const addCart = async (id) => {
    const token = localStorage.getItem("Urban-token");
    await addToCart(token, { productId: id, quantity: 1 })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const removeCart = async (id, quantity, type) => {
    const token = localStorage.getItem("Urban-token");
    let qnt = quantity > 0 ? 1 : null;
    if (type === "full") qnt = null;
    await deleteFromCart(token, {
      productId: id,
      quantity: qnt,
    })
      .then((res) => {
        setReload(!reload);
      })
      .catch((err) => {
        setReload(!reload);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  const calculateSubtotal = () => {
    return products.reduce(
      (total, item) => total + item.quantity * item?.product?.price?.org,
      0
    );
  };

  useEffect(() => {
    getProducts();
  }, [reload]);

  const convertAddressToString = (addressObj) => {
    // Convert the address object to a string representation
    return `${addressObj.firstName} ${addressObj.lastName}, ${addressObj.completeAddress}, ${addressObj.phoneNumber}, ${addressObj.emailAddress}`;
  };

  const PlaceOrder = async () => {
    setButtonLoad(true);
    try {
      const isDeliveryDetailsFilled =
        deliveryDetails.firstName &&
        deliveryDetails.lastName &&
        deliveryDetails.completeAddress &&
        deliveryDetails.phoneNumber &&
        deliveryDetails.emailAddress;

      if (!isDeliveryDetailsFilled) {
        // Show an error message or handle the situation where delivery details are incomplete
        dispatch(
          openSnackbar({
            message: "Please fill in all required delivery details.",
            severity: "error",
          })
        );
        return;
      }
      const token = localStorage.getItem("Urban-token");
      const totalAmount = calculateSubtotal().toFixed(2);
      const orderDetails = {
        products,
        address: convertAddressToString(deliveryDetails),
        totalAmount,
      };

      await placeOrder(token, orderDetails);

      // Show success message or navigate to a success page
      dispatch(
        openSnackbar({
          message: "Order placed successfully",
          severity: "success",
        })
      );
      setButtonLoad(false);
      // Clear the cart and update the UI
      setReload(!reload);
    } catch (error) {
      // Handle errors, show error message, etc.
      dispatch(
        openSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
      setButtonLoad(false);
    }
  };
  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Section>
          <Title>Your Shopping Cart</Title>
          {products.length === 0 ? (
            <>Cart is empty</>
          ) : (
            <Wrapper>
              <Left>
                <Table>
                  <TableItem bold flex >Product</TableItem>
                  <TableItem bold>Price</TableItem>
                  <TableItem bold>Quantity</TableItem>
                  <TableItem bold>Total</TableItem>
                </Table>
                {products?.map((item) => (
                  <Table>
                    <TableItem flex >
                      <Product>
                        <Img src={item?.product?.img} />
                        <Details>
                          <ProTitle>{item?.product?.title}</ProTitle>
                          <ProDesc>{item?.product?.name}</ProDesc>
                          <ProSize>Size: Xl</ProSize>
                        </Details>
                      </Product>
                    </TableItem>
                    <TableItem >${item?.product?.price?.org}</TableItem>
                    <TableItem >
                    <Counter>
                        <div
                          style={{
                            cursor: "pointer",
                            flex: 1,
                          }}
                          onClick={() =>
                            removeCart(item?.product?._id, item?.quantity - 1)
                          }
                        >
                          -
                        </div>
                        {item?.quantity}
                        <div
                          style={{
                            cursor: "pointer",
                            flex: 1,
                          }}
                          onClick={() => addCart(item?.product?._id)}
                        >
                          +
                        </div>
                      </Counter>
                    </TableItem>
                    <TableItem>
                      {" "}
                      ${(item.quantity * item?.product?.price?.org).toFixed(2)}
                    </TableItem>
                    <TableItem>
                      <DeleteOutline
                        sx={{ color: "red" }}
                        onClick={() =>
                          removeCart(
                            item?.product?._id,
                            item?.quantity - 1,
                            "full"
                          )
                        }
                      />
                    </TableItem>
                  </Table>
                ))}
              </Left>
              <Right>
              <Subtotal>
                  Subtotal : ${calculateSubtotal().toFixed(2)}
                </Subtotal>
                <Delivery>
                  Payment Details:
                  <div>
                    <TextInput small placeholder="Card Number" />
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      <TextInput small placeholder="Expiry Date" />
                      <TextInput small placeholder="CVV" />
                    </div>
                    <TextInput small placeholder="Card Holder name" />
                  </div>
                </Delivery>
                <Delivery>
                  Delivery Details:
                  <div>
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                      }}
                    >
                      <TextInput
                        small
                        placeholder="First Name"
                        value={deliveryDetails.firstName}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            firstName: e.target.value,
                          })
                        }
                      />
                      <TextInput
                        small
                        placeholder="Last Name"
                        value={deliveryDetails.lastName}
                        handelChange={(e) =>
                          setDeliveryDetails({
                            ...deliveryDetails,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <TextInput
                      small
                      value={deliveryDetails.emailAddress}
                      handelChange={(e) =>
                        setDeliveryDetails({
                          ...deliveryDetails,
                          emailAddress: e.target.value,
                        })
                      }
                      placeholder="Email Address"
                    />
                    <TextInput
                      small
                      value={deliveryDetails.phoneNumber}
                      handelChange={(e) =>
                        setDeliveryDetails({
                          ...deliveryDetails,
                          phoneNumber: e.target.value,
                        })
                      }
                      placeholder="Phone no. +91 XXXXX XXXXX"
                    />
                    <TextInput
                      small
                      textArea
                      rows="4"
                      handelChange={(e) =>
                        setDeliveryDetails({
                          ...deliveryDetails,
                          completeAddress: e.target.value,
                        })
                      }
                      value={deliveryDetails.completeAddress}
                      placeholder="Complete Address (Address, State, Country, Pincode)"
                    />
                  </div>
                </Delivery>
                <Button
                  text="Place Order"
                  small
                  isLoading={buttonLoad}
                  iddisabled={buttonLoad}
                  onClick={PlaceOrder}
                />
              </Right>
            </Wrapper>
          )}
        </Section>
      )}
    </Container>
  )
}

export default Cart