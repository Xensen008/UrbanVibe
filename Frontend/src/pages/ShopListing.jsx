import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import styled from "styled-components";
import { category, filter } from "../utils/data";
import { CircularProgress, Slider } from "@mui/material";
import { getAllProducts } from "../api";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";

const Container = styled.div`
  padding: 20px 30px;
  height: 100vh;
  overflow-y: auto;
  display: flex;
  gap: 30px;
  background: ${({ theme }) => theme.bg};

  @media (max-width: 768px) {
    padding: 20px 12px;
    flex-direction: column;
  }
`;

const Filters = styled.div`
  width: 230px;
  height: fit-content;
  padding: 20px 16px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 12px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Products = styled.div`
  flex: 1;
  padding: 12px;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 24px;
  justify-content: center;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
`;

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SelectableItem = styled.div`
  cursor: pointer;
  display: flex;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  color: ${({ theme }) => theme.text_secondary + 90};
  border-radius: 8px;
  padding: 2px 8px;
  font-size: 16px;
  width: fit-content;
  ${({ selected, theme }) =>
    selected &&
    `
  border: 1px solid ${theme.text_primary};
  color: ${theme.text_primary};
  background: ${theme.text_primary + 30};
  font-weight: 500;
  `}
`;

const ResetButton = styled(Button)`
  margin-top: 16px;
`;

const ShopListing = () => {
  const { category } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(category ? [category] : []);

  const getFilteredProductsData = async () => {
    setLoading(true);
    try {
      let queryString = '';
      if (priceRange[0] !== 0 || priceRange[1] !== 1000) {
        queryString += `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;
      }
      if (selectedSizes.length > 0 && selectedSizes.length < 5) {
        queryString += `&sizes=${selectedSizes.join(",")}`;
      }

      // Add categories only if some are selected
      if (selectedCategories.length > 0 && selectedCategories.length < 7) {
        queryString += `&categories=${selectedCategories.join(",")}`;
      }

      const res = await getAllProducts(queryString);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFilteredProductsData();
  }, [priceRange, selectedSizes, selectedCategories, category]);

  useEffect(() => {
    if (category) {
      setSelectedCategories([category]);
    }
  }, [category]);

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedSizes([]);
    setSelectedCategories([]);
  };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Filters>
            <Menu>
              {filter.map((filters, index) => (
                <FilterSection key={`filter-${index}`}>
                  <Title>{filters.name}</Title>
                  {filters.value === "price" ? (
                    <>
                      <Slider
                        getAriaLabel={() => 'Price range'}
                        value={priceRange}
                        min={0}
                        max={1000}
                        valueLabelDisplay="auto"
                        marks={[
                          { value: 0, label: "$0" },
                          { value: 1000, label: "$1000" },
                        ]}
                        onChange={(e, newValue) => setPriceRange(newValue)}
                      />
                    </>
                  ) : filters.value === "size" ? (
                    <Item>
                      {filters.items.map((item) => (
                        <SelectableItem
                          key={item}
                          selected={selectedSizes.includes(item)}
                          onClick={() =>
                            setSelectedSizes((prevSizes) =>
                              prevSizes.includes(item)
                                ? prevSizes.filter(
                                    (size) => size !== item
                                  )
                                : [...prevSizes, item]
                            )
                          }
                        >
                          {item}
                        </SelectableItem>
                      ))}
                    </Item>
                  ) : filters.value === "category" ? (
                    <Item>
                      {filters.items.map((item) => (
                        <SelectableItem
                          key={item}
                          selected={selectedCategories.includes(item)}
                          onClick={() =>
                            setSelectedCategories((prevCategories) =>
                              prevCategories.includes(item)
                                ? prevCategories.filter(
                                    (category) => category !== item
                                  )
                                : [...prevCategories, item]
                            )
                          }
                        >
                          {item}
                        </SelectableItem>
                      ))}
                    </Item>
                  ) : null}
                </FilterSection>
              ))}
              <ResetButton variant="outlined" onClick={resetFilters}>
                Reset Filters
              </ResetButton>
            </Menu>
          </Filters>
          <Products>
            <CardWrapper>
              {products?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </CardWrapper>
          </Products>
        </>
      )}
    </Container>
  );
};

export default ShopListing;
