const router = require('express').Router()
const { addNewProduct, getAllProduct, deleteProduct, updateProduct, getAllOrder ,getProductById} = require('../Controllers/adminControllers');
const { verifyToken } = require('../middleware/auth');



router.post('/create-product',verifyToken, addNewProduct);
router.get('/get-all-products',verifyToken, getAllProduct);
router.post('/delete-product', verifyToken, deleteProduct);
router.post('/update-product', verifyToken,updateProduct);
router.post('/get-product',verifyToken, getProductById);
router.get('/get-all-order', verifyToken, getAllOrder),




    module.exports = router