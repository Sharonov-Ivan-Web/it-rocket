const express = require('express')
const router = express.Router();
const controllerSettings = require('../controllers/Settings')

router.get('/', controllerSettings.get)
router.post('/add', controllerSettings.add)
router.post('/update', controllerSettings.update)

module.exports = router;