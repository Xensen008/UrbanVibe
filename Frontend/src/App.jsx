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
import ProductDetails from "./pages/ProductDetails";
import { useSelector } from "react-redux";
import ToastMsg from "./components/ToastMsg";
import ProtectedRoute from "./components/Protection/ProtectedRoute";

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
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const [openAuth, setOpenAuth] = React.useState(false);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar openAuth={openAuth} setOpenAuth={setOpenAuth} currentUser={currentUser} />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/Shop" element={
              <ProtectedRoute openAuth={openAuth} setOpenAuth={setOpenAuth}>
                <ShopListing />
              </ProtectedRoute>
            } />
            <Route path="/Shop/category/:category" element={
              <ProtectedRoute>
                <ShopListing />
              </ProtectedRoute>
            } />
            <Route path="/Shop/product/:id" element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            } />
            <Route path="/Wishlist" element={
              <ProtectedRoute>
                <Favourite />
              </ProtectedRoute>
            } />
            <Route path="/New-Arrival" element={
              <ProtectedRoute>
                <NewArrival />
              </ProtectedRoute>
            } />
            <Route path="/Contact-Us" element={
              <ProtectedRoute>
                <ContactUs />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            } />
            <Route path="/Cart" element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } />
          </Routes>
          <Authentication openAuth={openAuth} setOpenAuth={setOpenAuth} />
          {open && <ToastMsg message={message} severity={severity} open={open} />}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
