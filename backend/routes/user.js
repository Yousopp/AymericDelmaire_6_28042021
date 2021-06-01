const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const strongPassword = require('../middleware/strong-password');

router.post('/signup', strongPassword, userCtrl.signupUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;