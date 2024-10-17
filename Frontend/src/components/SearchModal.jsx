import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchRounded, Close as CloseIcon } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import { searchProducts } from '../api';
import { useNavigate } from 'react-router-dom';

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: ${({ theme }) => theme.bg};
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
    margin: 10px;
  }
`;

const SearchContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.bg_light};
  border-radius: 30px;
  padding: 10px 20px;

  @media (max-width: 768px) {
    padding: 8px 15px;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  outline: none;
  padding: 10px;

  @media (max-width: 768px) {
    font-size: 16px;
    padding: 8px;
  }
`;

const SearchIcon = styled(SearchRounded)`
  color: ${({ theme }) => theme.text_secondary};
  font-size: 24px;
`;

const ResultsContainer = styled.div`
  max-height: 60vh;
  overflow-y: auto;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const NoResults = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  padding: 20px;
`;

// const ResultItem = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 15px;
//   cursor: pointer;
//   border-radius: 8px;
//   transition: background-color 0.3s ease;
//   &:hover {
//     background-color: ${({ theme }) => theme.bg_light};
//   }
// `;

const ProductSize = styled.span`
  font-size: 0.8em;
  color: ${({ theme }) => theme.text_secondary};
`;

const CloseButton = styled(CloseIcon)`
  color: ${({ theme }) => theme.text_primary};
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ResultItem = styled.div`
  display: flex;
  align-items: center;
//   padding: 15px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.bg_light};
  }
`;

const ProductName = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: ${({ theme }) => theme.text_secondary};
`;

const ProductCategory = styled.span`
  font-size: 0.8em;
  color: ${({ theme }) => theme.text_secondary};
`;

const ProductPrice = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.text_primary};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;



const SearchModal = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearchIconClick = async () => {
        if (searchTerm.trim() !== '') {
            setLoading(true);
            try {
                const results = await searchProducts(searchTerm);
                setSearchResults(Array.isArray(results) ? results : []);
            } catch (error) {
                console.error('Error searching products:', error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleResultClick = (productId) => {
        navigate(`/Shop/product/${productId}`);
        onClose();
    };

    const handleClose = () => {
        setSearchTerm('');
        setSearchResults([]);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <ModalOverlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <ModalContent
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                    >
                        <SearchContainer>
                            <SearchInput
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearchIconClick();
                                    }
                                }}
                                autoFocus
                            />
                            <SearchIcon onClick={handleSearchIconClick} style={{ cursor: 'pointer' }} />
                            <CloseButton onClick={handleClose} />
                        </SearchContainer>
                        <ResultsContainer>
                            {loading ? (
                                <LoadingContainer>
                                    <CircularProgress />
                                </LoadingContainer>
                            ) : searchResults.length > 0 ? (
                                searchResults.map((product) => (
                                    <ResultItem key={product._id} onClick={() => handleResultClick(product._id)}>
                                        <ProductImage src={product.img} alt={product.name} />
                                        <ProductInfo>
                                            <ProductName>{product.name || 'Unnamed Product'}</ProductName>
                                            <ProductCategory>{product.category ? product.category.join(', ') : 'Uncategorized'}</ProductCategory>
                                            <ProductPrice>${product.price && product.price.org ? product.price.org : 'N/A'}</ProductPrice>
                                            <ProductSize>Size: {product.sizes && product.sizes.length > 0 ? product.sizes.join(', ') : 'N/A'}</ProductSize>
                                        </ProductInfo>
                                    </ResultItem>
                                ))
                            ) : (
                                <NoResults>No results found</NoResults>
                            )}
                        </ResultsContainer>
                    </ModalContent>
                </ModalOverlay>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
