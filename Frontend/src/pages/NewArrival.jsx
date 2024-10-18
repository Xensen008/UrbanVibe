import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import ProductCard from '../components/cards/ProductCard'
import { getAllProducts } from '../api'
import { useDispatch } from 'react-redux'
import { openSnackbar } from '../Redux/reducer/snackbarSlice'
import { CircularProgress } from '@mui/material'
import { category } from '../utils/data'

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  min-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background: ${({ theme }) => theme.bg};
  
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
`;

const Content = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 36px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  text-align: center;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const FilterSection = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme, active }) => active ? theme.primary : 'transparent'};
  color: ${({ theme, active }) => active ? 'white' : theme.text_primary};
  border: 2px solid ${({ theme }) => theme.primary};
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  justify-content: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 20px;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; // Adjust this value as needed
`;

function NewArrival() {
  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      const sortedProducts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(sortedProducts);
      setFilteredProducts(sortedProducts);
    } catch (error) {
      dispatch(openSnackbar({
        message: "Failed to fetch products",
        severity: "error",
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => 
        Array.isArray(product.category) 
          ? product.category.some(cat => cat.toLowerCase() === filter.toLowerCase())
          : product.category.toLowerCase() === filter.toLowerCase()
      ));
    }
  }, [filter, products]);

  return (
    <Container>
      <Content>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          New Arrivals
        </Title>

        <FilterSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FilterButton
            key="All"
            active={filter === 'All'}
            onClick={() => setFilter('All')}
          >
            All
          </FilterButton>
          {category.map((cat) => (
            <FilterButton
              key={cat.name}
              active={filter === cat.name}
              onClick={() => setFilter(cat.name)}
            >
              {cat.name}
            </FilterButton>
          ))}
        </FilterSection>

        {loading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <CardWrapper>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </CardWrapper>
        )}
      </Content>
    </Container>
  )
}

export default NewArrival
