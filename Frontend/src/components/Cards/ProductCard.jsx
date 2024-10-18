import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { AddShoppingCartRounded, FavoriteRounded } from '@mui/icons-material';
import { AddShoppingCartOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToFavourite, deleteFromFavourite,getFavourite , addToCart} from '../../api';
import { useSelector } from 'react-redux';
import { openSnackbar } from '../../Redux/reducer/snackbarSlice';
import { FavoriteBorder } from '@mui/icons-material';
import { motion } from "framer-motion";

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

  @media (max-width: 768px) {
    display: flex;  // Always display on small screens
  }
`
const Top = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  position: relative;
  transition: all 0.3s ease-out;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }

  &:hover ${Image} {
    opacity: 0.8;
  }

  &:hover ${Menu} {
    display: flex;
  }

  @media (max-width: 768px) {
    &:hover ${Menu} {
      display: flex;  
    }
    ${Menu} {
      display: flex;  
    }
    ${Image} {
      opacity: 1;  
    }
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
function ProductCard({ product, onFavoriteUpdate = () => {} }) {
  const dispatch = useDispatch();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const navigate = useNavigate();
  const addFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("Urban-token");
    await addToFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
        if (onFavoriteUpdate) onFavoriteUpdate();
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
        if (onFavoriteUpdate) onFavoriteUpdate();
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
    const token = localStorage.getItem("Urban-token");
    await addToCart(token, { productId: product?._id, quantity: 1 })
      .then((res) => {
        navigate("/cart");
      })
      .catch((err) => {
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
    if (product) {
      checkFavourite();
    }
  }, [product]);
  return (
    <Card>
      <Top>
        <Image src={product?.img} />
        <Menu>
          <MenuItem
            onClick={() => (favorite ? removeFavorite() : addFavorite())}
          >
            {favoriteLoading ? (
              // <motion.div
              //   initial={{ scale: 0 }}
              //   animate={{ scale: 0.5 }}
              //   transition={{ duration: 0.2 }}
              // >
                <FavoriteRounded sx={{ fontSize: "20px", color: "red" }} />
              // </motion.div>
            ) : (
              <>
                {favorite ? (
                  <FavoriteRounded sx={{ fontSize: "20px", color: "red" }} />
                ) : (
                  <FavoriteBorder sx={{ fontSize: "20px" }} />
                )}
              </>
            )}
          </MenuItem>{" "}

          <MenuItem onClick={() => addCart(product?.id)}>
            <AddShoppingCartOutlined
              sx={{ color: "inherit", fontSize: "20px" }}
            />
          </MenuItem>
        </Menu>
        <Rate>
          <Rating value={3} sx={{ fontSize: 14 }} />
        </Rate>
      </Top>
      <Details onClick={() => navigate(`/Shop/product/${product._id}`)}>
        <Title>
          {product?.title}
        </Title>
        <Desc>
          {product?.desc}
        </Desc>
        <Price>
          ${product?.price?.org}  <Span> ${product?.price?.org}</Span> <Percentage>{product?.price?.off}% off</Percentage>
        </Price>
      </Details>
    </Card>
  )
}

export default ProductCard
