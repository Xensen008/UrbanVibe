import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Authentication from "./pages/Authentication";
import NewArrival from "./pages/NewArrival";
import Favourite from "./pages/Favourite";
import ShopListing from "./pages/ShopListing";
import Orders from "./pages/Orders";
import ContactUs from "./pages/ContactUs";


const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-y: hidden;
  overflow-x: hidden;
  transition: all 0.2s ease;
`;

function App() {
  const [openAuth, setOpenAuth] = React.useState(false);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar setOpenAuth={setOpenAuth} />
          <Routes>
            <Route path="/" exact element={<Home/>} />
            <Route path="/Shop" exact element={<ShopListing/>} />
            <Route path="/Wishlist" element={<Favourite/>} />
            <Route path="/New-Arrival" element={<NewArrival/>} />
            <Route path="/Contact-Us" element={<ContactUs/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/Cart" element={<Cart/>} />
          </Routes>
          {openAuth && <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth} />}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
