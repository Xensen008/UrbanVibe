import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import Button from '../components/Button'
import { FavoriteRounded, FavoriteBorder } from '@mui/icons-material'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getProductDetails, addToFavourite, deleteFromFavourite, addToCart, getFavourite } from '../api';
import { CircularProgress } from '@mui/material';
import { openSnackbar } from '../Redux/reducer/snackbarSlice';

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
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const [selected, setSelected] = useState();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);


  const getProduct = async () => {
    setLoading(true);
    await getProductDetails(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  };

  const addFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("Urban-token");
    await addToFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const removeFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("Urban-token");
    await deleteFromFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const addCart = async () => {
    setCartLoading(true);
    const token = localStorage.getItem("Urban-token");
    await addToCart(token, { productId: product?._id, quantity: 1 })
      .then((res) => {
        setCartLoading(false);
        navigate("/cart");
      })
      .catch((err) => {
        setCartLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };
  const checkFavourite = async () => {
    if (!product) return; // Exit if product is not loaded yet
    setFavoriteLoading(true);
    const token = localStorage.getItem("Urban-token");
    try {
      const res = await getFavourite(token);
      if (res.data && Array.isArray(res.data.favourites)) {
        const isFavorite = res.data.favourites.some(
          (favorite) => favorite._id === product._id
        );
        setFavorite(isFavorite);
      } else {
        console.error("Unexpected response format:", res.data);
        setFavorite(false);
      }
    } catch (err) {
      console.error("Error checking favourite:", err);
      dispatch(
        openSnackbar({
          message: err.message || "Error checking favourite status",
          severity: "error",
        })
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);
  
  useEffect(() => {
    if (product) {
      checkFavourite();
    }
  }, [product]);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Wrapper>
          <ImageWrapper>
            <Image src={product?.img} />
          </ImageWrapper>
          <Details>
            <div>
              <Title>{product?.title}</Title>
              <Name>{product?.name}</Name>
            </div>
            <Rating value={3.5} />
            <Price>
              ${product?.price?.org} <Span>${product?.price?.mrp}</Span>{" "}
              <Percent> (${product?.price?.off}% Off) </Percent>
            </Price>
            <Desc>{product?.desc}</Desc>
            <Sizes>
              <Items>
                {product?.sizes.map((size) => (
                  <Item
                    key={size}
                    selected={selected === size}
                    onClick={() => setSelected(size)}
                  >
                    {size}
                  </Item>
                ))}
              </Items>
            </Sizes>
            <ButtonWrapper>
              <Button
                text="Add to Cart"
                full
                outlined
                isLoading={cartLoading}
                onClick={() => addCart()}
              />
              <Button text="Buy Now" full />
              <Button
                leftIcon={
                  favorite ? (
                    <FavoriteRounded sx={{ fontSize: "22px", color: "red" }} />
                  ) : (
                    <FavoriteBorder sx={{ fontSize: "22px" }} />
                  )
                }
                full
                outlined
                isLoading={favoriteLoading}
                onClick={() => (favorite ? removeFavorite() : addFavorite())}
              />
            </ButtonWrapper>
          </Details>
        </Wrapper>
      )}
    </Container>
  );
};

export default ProductDetails
