const express = require('express')
const router = express.Router();
const controllerEmployees = require('../controllers/Employees')

router.get('/', controllerEmployees.getByFilter)
router.get('/card', controllerEmployees.getById)
router.post('/add', controllerEmployees.add)
router.post('/update', controllerEmployees.update)
router.post('/delete', controllerEmployees.delete)
router.post('/auth', controllerEmployees.auth)
router.post('/verify', controllerEmployees.verify)
router.post('/getLinkSignup', controllerEmployees.getLinkSignup)
router.get('/signup', controllerEmployees.verifySignup)

module.exports = router;