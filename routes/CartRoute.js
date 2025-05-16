const express =  require('express');
const router = express.Router();
const {
getCart,createdcart, deleteCartItem
}  = require('../controllers/CartController');

router.get('/:userId', getCart);
router.post('/:userId', createdcart);
router.delete('/:userId/:productId', deleteCartItem);

module.exports = router;