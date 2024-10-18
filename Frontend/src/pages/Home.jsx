import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HeroImg from '../utils/Images/Header.png'
import { category } from '../utils/data'
import ProductCategoryCard from '../components/Cards/ProductCategoryCard'
import ProductCard from '../components/Cards/ProductCard'
import { motion } from 'framer-motion'
import { getAllProducts } from '../api'


const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
    scroll-behavior: smooth;
  }
  background: ${({ theme }) => theme.bg};
`
const Section = styled.section`
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  gap: 28px;
  flex-direction: column;
`
const Img = styled.img`
  width: 100%;
  object-fit: cover;
  max-width: 1400px;
  height: 700px;
  @media (max-width: 768px) {
    height: 600px;
  }
`
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? 'center' : 'space-between')};
  align-items: center; 

`
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 768px) {
    gap: 12px;
  }

`
const AnimatedSection = motion.create(Section)
function Home() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  }

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Container>
      <AnimatedSection
        style={{
          alignItems: 'center',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Img src={HeroImg} alt="heroImage" />
      </AnimatedSection>
      <AnimatedSection
        style={{
          alignItems: 'center',
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Title>Shop by Categories</Title>
        <CardWrapper>
          {category.map((categoryItem) => (
            <ProductCategoryCard key={categoryItem.name} category={categoryItem} />
          ))}
        </CardWrapper>
      </AnimatedSection>
      <AnimatedSection
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Title center>Our Bestseller</Title>
        <CardWrapper>
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </CardWrapper>
      </AnimatedSection>
    </Container>
  )
}

export default Home
