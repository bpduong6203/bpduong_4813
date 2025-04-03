const express = require('express');
const router = express.Router();
const Product = require('../schemas/product');
const Category = require('../schemas/category');

router.get('/slug/:categorySlug', async (req, res) => {
    try {
        const { categorySlug } = req.params;
        
        const category = await Category.findOne({ slug: categorySlug });
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        const products = await Product.find({ 
            category: category._id,
            isDeleted: false 
        });
        
        return res.status(200).json({
            category,
            products
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get('/slug/:categorySlug/:productSlug', async (req, res) => {
    try {
        const { categorySlug, productSlug } = req.params;
        
        const category = await Category.findOne({ slug: categorySlug });
        
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        
        const product = await Product.findOne({
            category: category._id,
            slug: productSlug,
            isDeleted: false
        });
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        return res.status(200).json({ product });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
