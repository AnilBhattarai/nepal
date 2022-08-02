const express = require('express');
const router = express.Router();

const { menuController, menuItemController } = require('../../modules/menu/menucontroller');
const { sanitize, validate, itemSanitize, itemValidate } = require('../../modules/menu/menuValidation');
const { authorization, authentication } = require('../../middleware/authentication.middleware');

router.get('/', menuController.getMenu);

router.post('/', sanitize, validate, authorization, authentication, menuController.saveMenu);

router.post('/menuitem', itemSanitize, itemValidate, authorization, authentication, menuItemController.saveMenuItem);
router.get('/menuitem/:id', authorization, menuItemController.getMenuItem);
router.delete('/menuitem/:id', authorization, menuItemController.deleteMenuItem);
router.get('/detail/:id', menuController.getEditMenu);
router.get('/detailforuser/:key', menuController.getMenuForUser);

router.delete('/:id', authorization, authentication, menuController.deleteMenu);

module.exports = router;
