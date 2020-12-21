const router = require('express').Router();

const ProductController = require('../controller/ProductController');

router.post('/add', ProductController.addProduct);
router.get('/all', ProductController.getProducts);
router.get('/:id', ProductController.getProductById);

module.exports = router;