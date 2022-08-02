const express = require('express');
const router = express.Router();

const favModule = require('../../modules/favoriteProperty/favoritePropertyController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { validate } = require('../../modules/favoriteProperty/favoritePropertyValidation');

router.post('/', authorization, validate, favModule.postFavorite);
router.get('/', authorization, favModule.getFavorite);
router.get('/:property_id', authorization, favModule.getForPropertyFavorite);

module.exports = router;
