const express = require('express');
const router = express.Router();
const {createdProduct , getProduct, 
    updateProduct, deleteProduct ,  getAllProduct
}  = require('../controllers/ProductController.js')

router.post('/product', createdProduct);
router.get('/product/:id', getProduct);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.get('/product', getAllProduct);

module.exports  = router 