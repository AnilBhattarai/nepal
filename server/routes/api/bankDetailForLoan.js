const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/blog/');
const uploader = fileUpload.uploader;

const bankDetailForLoanModule = require('../../modules/bankDetailForLoan/bankDetailForLoanController');
const { authorization, authentication } = require('../../middleware/authentication.middleware');
const { sanitize } = require('../../modules/bankDetailForLoan/bankDetailForLoanValidation');

router.get('/',  bankDetailForLoanModule.getBankDetailForLoan);
router.post('/',uploader.single('file'),sanitize,authorization,authentication, bankDetailForLoanModule.saveBankDetailForLoan);
router.delete('/:id',authorization,authentication,bankDetailForLoanModule.deleteBankDetailForLoan);
router.get('/:id' , authorization,authentication,bankDetailForLoanModule.getBankDetailForLoanDetail);


module.exports = router;

