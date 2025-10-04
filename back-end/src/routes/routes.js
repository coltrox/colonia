const express = require('express');
const router = express.Router();
const moduleController = require('../controllers/ModuleController');
const authController = require('../controllers/AuthController');

router.post('/auth/login', authController.login);

router.use(authController.verifyToken);

router.get('/modules', moduleController.getAllModuleStatuses); 

router.get('/modules/:id', moduleController.getModuleStatusById); 

router.get('/modules/:name/history', moduleController.getModuleHistoryByName);

module.exports = router;
