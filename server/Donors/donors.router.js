const express=require('express')
const router=express.Router()

const donorController=require('./donors.controller')
router.post('/adddonor',donorController.adddonor)
router.get('/viewdonor',donorController.veiwDonor)
router.post('/approve',donorController.approveDonors)
router.post('/reject',donorController.rejectDonors)
router.post('/adddonation',donorController.addDonation)
router.post('/viewdonationsdonors',donorController.viewDonationByDonor)
router.post('/deleteDonations',donorController.deletedonationbydonors)
router.post('/getDonations',donorController.getDonation)
router.post('/updateDonations',donorController.updateDonation)
router.post('/request',donorController.requestShelter)
router.post('/requestDonordetails',donorController.requestDonordetails)
router.post('/getdon',donorController.getDonationsByDonorId)
router.post('/cancelDonation',donorController.Canceldonation)
router.post('/getnotification',donorController.getNotifications)
router.post('/verify',donorController.verify)
router.post('/addreview',donorController.addReview)
router.get('/viewreview',donorController.getReviews)
router.post('/getReviewsByDonor',donorController.getReviewsByDonor)
router.get('/profileview/:id', donorController.profileviewDonor);
router.post('/profileupdate/:id', donorController.profileupdateDonor);
router.post('/updatePaymentStatus',donorController.updatePaymentStatus)
router.post('/viewhistory',donorController.ViewHistory)
router.post('/viewcloseddonors',donorController.viewcloseddonors)
router.post('/addmessage',donorController.addMessage)
router.post('/getmessages', donorController.getMessages);
router.post('/addReply',donorController.sendReply)
router.post('/getReplies',donorController.getReply)
router.post('/start',donorController.start)
router.post('/ontheway',donorController.ontheway)
router.post('/delevered', donorController.delevered);
router.post('/track',donorController.track)
router.post('/viewdons',donorController.viewDons)
router.post('/delivered',donorController.updations)




module.exports=router