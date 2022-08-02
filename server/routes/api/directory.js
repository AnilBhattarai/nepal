const express = require('express');
const router = express.Router();
const directoryModule = require('../../modules/directory/directoryController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { validate } = require('../../modules/directory/directoryValidation');

router.get('/public', directoryModule.getAutoDirectory);

router.post('/', validate, authorization, directoryModule.saveDirectory);
router.get('/admin', authorization, directoryModule.getAllDirectory);
router.get('/all', directoryModule.getDirectory);
router.get('/:id', directoryModule.getDirectoryDetail);
router.delete('/delete/:id', authorization, directoryModule.deleteDirectory);
module.exports = router;
