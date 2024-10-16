import axios from "axios";

const API = axios.create({
  baseURL: "https://urbanvibe.onrender.com/api/",
});

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'urban_preset');

  try {
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dme7rom2k/image/upload',
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error.response ? error.response.data : error.message);
    throw error;
  }
};


export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signin", data);

//Products
export const getAllProducts = async (filter) =>
  await API.get(`/product?${filter}`);

export const getProductDetails = async (id) => await API.get(`/product/${id}`);

//Cart

export const getCart = async (token) =>
  await API.get("/user/cart", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = async (token, data) =>
  await API.post(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromCart = async (token, data) =>
  await API.patch(`/user/cart/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

//Favourites

export const getFavourite = async (token) =>
  await API.get(`/user/favorite`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToFavourite = async (token, data) =>
  await API.post(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteFromFavourite = async (token, data) =>
  await API.patch(`/user/favorite/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

//Orders

export const placeOrder = async (token, data) =>
  await API.post(`/user/order/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrders = async (token) =>
  await API.get(`/user/order/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const markOrderAsDelivered = async (token, orderId) =>
  await API.patch(`/user/order/deliver`, { orderId }, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Update the existing cancelOrder function to use the new route
export const cancelOrder = async (token, orderId) =>
  await API.patch(`/user/order/cancel`, { orderId }, {
    headers: { Authorization: `Bearer ${token}` },
  });


export const searchProducts = async (query) => {
  try {
    console.log('Searching for:', query);
    const response = await API.get(`/product/search?q=${encodeURIComponent(query)}`);
    console.log('Search API response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};