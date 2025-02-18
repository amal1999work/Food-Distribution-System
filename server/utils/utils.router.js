const express = require("express");
const router = express.Router();

const utilController = require('../utils/utils.controller')

 router.post('/fileupload',utilController.fileUpload) 


module.exports=router