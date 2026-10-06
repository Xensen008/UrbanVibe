import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './Models/Product.Model.js';

dotenv.config();

const DB_URL = process.env.DB_URL;

const PRODUCT_FIXES = [
    { title: 'Classic Winter Jacket', org: 1200, mrp: 1200, off: 0 },
    { title: 'Summer Cotton Dress', org: 1540, mrp: 1540, off: 0 },
    { title: 'Leather Shoulder Bag', org: 700, mrp: 800, off: 13 },
    { title: 'Woolen Scarf', org: 699, mrp: 1200, off: 42 },
    { title: 'Formal Blazer', org: 2599, mrp: 3999, off: 35 },
    { title: 'Elegant Saree', org: 599, mrp: 799, off: 25 },
    { title: "Boys' Denim Jeans", org: 800, mrp: 1000, off: 20 },
    { title: "Boys' Winter Jacket", org: 1200, mrp: 2000, off: 40 },
    { title: "Men's Leather Belt", org: 399, mrp: 500, off: 20 },
];

async function updateProductPrices() {
    try {
        await mongoose.connect(DB_URL);
        console.log('Connected to database');

        let updatedCount = 0;

        for (const fix of PRODUCT_FIXES) {
            const product = await Product.findOne({ title: fix.title });

            if (!product) {
                console.log(`Product not found: ${fix.title}`);
                continue;
            }

            const { org, mrp, off } = fix;

            const oldPrice = { ...product.price.toObject() };
            product.price.org = org;
            product.price.mrp = mrp;
            product.price.off = off;

            await product.save();
            console.log(`Updated: ${product.title}`);
            console.log(`   Selling Price (org): $${oldPrice.org} -> $${org}`);
            console.log(`   MRP Price (mrp):     $${oldPrice.mrp} -> $${mrp}`);
            console.log(`   Discount (off):       ${oldPrice.off}% -> ${off}%`);
            updatedCount++;
        }

        console.log('\nAll products in DB:');
        const allProducts = await Product.find().select('title price');
        allProducts.forEach(p => {
            const { org, mrp, off } = p.price;
            console.log(` - ${p.title}: Selling=$${org}, MRP=$${mrp}, Discount=${off}%`);
        });

        console.log(`\nUpdated ${updatedCount} products successfully.`);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

updateProductPrices();
