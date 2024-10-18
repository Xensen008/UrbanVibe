import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import ProductCard from '../components/ProductCard'
import { motion } from 'framer-motion';
import { getFavourite } from "../api";
import { CircularProgress } from "@mui/material";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;
const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

function Favourite() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [favoriteUpdate, setFavoriteUpdate] = useState(0);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("Urban-token");
      const res = await getFavourite(token);
      console.log("API response:", res); // Debug log
      if (res.data && Array.isArray(res.data.favourites)) {
        setProducts(res.data.favourites);
      } else {
        console.error("Unexpected API response format:", res.data);
        setError("Unexpected data format received from server");
      }
    } catch (err) {
      console.error("Error fetching favourites:", err);
      setError("Failed to fetch favourite products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [favoriteUpdate]);

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const handleFavoriteUpdate = () => {
    setFavoriteUpdate(prev => prev + 1);
  };

  return (
    <Container>
      <Section>
        <Title>Your Favourite</Title>
        {loading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : error ? (
          <div>{error}</div>
        ) : products.length === 0 ? (
          <div>No favourite products</div>
        ) : (
          <CardWrapper
            as={motion.div}
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            {products.map((product, index) => (
              <ProductCard 
                key={product._id || index} 
                product={product} 
                onFavoriteUpdate={handleFavoriteUpdate} 
              />
            ))}
          </CardWrapper>
        )}
      </Section>
    </Container>
  )
}

export default Favourite
