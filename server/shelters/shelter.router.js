const express=require('express')
const router=express.Router()

const shelterController=require('./shelter.controller')
router.post('/addShelter',shelterController.addShelter)
router.post('/login',shelterController.login)
router.get('/shelterview',shelterController.veiwshelters)
router.post('/approve', shelterController.approveShops);
router.post('/reject', shelterController.rejectShops);
router.post('/getShelterById', shelterController.getShelter);
router.post('/updateshelterprofile', shelterController.updateShelterProfile);
router.get('/profileview/:id', shelterController.profileviewShelter);
router.post('/getprofile', shelterController.getShelter);
router.post('/updateprofile', shelterController.editShelter);



module.exports=router