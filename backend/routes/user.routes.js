const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { route } = require('./api.routes');
const jwtHelpers = require('../helpers/jwt.helpers')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/checkUser', userController.checkUser)
router.get('/:id', userController.getUserById)
router.patch('/edit/:id', jwtHelpers.checkToken, userController.editUser)

module.exports = router