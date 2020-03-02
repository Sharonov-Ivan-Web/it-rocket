const express = require('express')
const router = express.Router();
const controllerDepartaments = require('../controllers/Departaments')

router.get('/', controllerDepartaments.getByFilter)
router.get('/:id', controllerDepartaments.getById)
router.post('/add', controllerDepartaments.add)
router.post('/update', controllerDepartaments.add)
router.post('/delete', controllerDepartaments.delete)

module.exports = router;