const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { checkToken } = require('../middlewares/auth.middleware');
const { route } = require('./api.routes');

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/checkUser', checkToken, userController.checkUser)
router.get('/:id', userController.getUserById)
router.patch('/edit/:id', checkToken, userController.editUser)

module.exports = router