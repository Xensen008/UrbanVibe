import express from 'express';
import { addProduct, getproducts, getProductById, searchProducts} from '../Controllers/Product.control.js';

const router = express.Router();

// Route to add products
router.post('/add', addProduct);

// Route to get products
router.get('/', getproducts);

// Route to get product by ID
router.get('/:id', getProductById);

// Route to search products
router.get('/search', searchProducts);

// Route to get product by ID
router.get('/:id', getProductById);

export default router;
