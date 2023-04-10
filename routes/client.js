const express = require('express');
const {
  addOrder,
  findByUser,
  findById,
} = require('../controllers/client/order');
const {
  getTrending,
  getOne,
  getAll,
} = require('../controllers/client/product');
const { signin, signup, check } = require('../controllers/client/user');
const { isLogin } = require('../middleware/auth');

const router = express.Router();
router.get('/', getTrending);
router.get('/product', getAll);
router.get('/product/find/:id', getOne);

router.post('/user/signin', signin);
router.post('/user/signup', signup);
router.get('/user/check', check);

router.post('/order/add', isLogin, addOrder);
router.get('/order/user', isLogin, findByUser);
router.get('/order/find/:id', isLogin, findById);

module.exports = router;
