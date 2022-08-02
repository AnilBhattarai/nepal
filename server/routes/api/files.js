const express = require('express');
const router = express.Router();
const fileUpload = require('../../helper/upload.helper')('public/files/');
const uploader = fileUpload.uploader;

const dModule = require('../../modules/files/filesController');
const { authentication, authorization } = require('../../middleware/authentication.middleware');

router.get('/folder/:id', authorization, authentication, dModule.GetFileAndFolder);
router.post('/folder/:id', authorization, authentication, dModule.AddFolders);
router.post('/file/:folder_id', authorization, authentication, uploader.any('file'), dModule.UploadFiles);
router.post('/rename/file', authorization, dModule.RenameFolder);
router.post('/file/type/:type', authorization, uploader.any('file'), dModule.UploadFilesToRoot);
router.delete('/folder/:id', authorization, authentication, dModule.DeleteFolder);
router.delete('/file/:id', authorization, authentication, dModule.DeleteFile);

module.exports = router;
