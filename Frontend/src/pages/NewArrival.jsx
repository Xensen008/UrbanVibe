import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import ProductCard from '../components/cards/ProductCard'

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

const newArrivals = [
  { id: 1, name: "Summer Breeze Dress", price: 79.99, category: "Dresses" },
  { id: 2, name: "Urban Explorer Backpack", price: 129.99, category: "Accessories" },
  { id: 3, name: "Sunset Glow Eyeshadow Palette", price: 45.99, category: "Beauty" },
  { id: 4, name: "Eco-Friendly Water Bottle", price: 24.99, category: "Accessories" },
  { id: 5, name: "Vintage Denim Jacket", price: 89.99, category: "Clothing" },
  { id: 6, name: "Smart Fitness Watch", price: 199.99, category: "Electronics" },
  { id: 7, name: "Boho Chic Maxi Skirt", price: 69.99, category: "Clothing" },
  { id: 8, name: "Noise-Canceling Headphones", price: 249.99, category: "Electronics" },
];

function NewArrival() {
  const [filter, setFilter] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState(newArrivals);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredProducts(newArrivals);
    } else {
      setFilteredProducts(newArrivals.filter(product => product.category === filter));
    }
  }, [filter]);

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
          {['All', 'Clothing', 'Accessories', 'Beauty', 'Electronics'].map((category) => (
            <FilterButton
              key={category}
              active={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterSection>

        <CardWrapper>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <ProductCard
                name={product.name}
                price={product.price}
                category={product.category}
              />
            </motion.div>
          ))}
        </CardWrapper>
      </Content>
    </Container>
  )
}

export default NewArrival