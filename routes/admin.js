const express = require('express');
const { dashboard } = require('../controllers/admin/history');
const {
  getAllProduct,
  getOneProduct,
  deleteProduct,
  addProduct,
  updateProduct,
} = require('../controllers/admin/product');
const { login, check } = require('../controllers/admin/user');
const { isAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/user/login', login);
router.get('/user/check', check);

router.get('/', isAdmin, dashboard);
router.get('/product', isAdmin, getAllProduct);
router.get('/product/find/:id', isAdmin, getOneProduct);
router.get('/product/delete/:id', isAdmin, deleteProduct);
router.post('/product/add', isAdmin, addProduct);
router.post('/product/update/:id', isAdmin, updateProduct);

module.exports = router;
