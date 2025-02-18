const models = require('./donors.model');
const model = require('../shelters/shelter.model');
const donorModel = models.donordetails;
const donoationModel = models.donation;
const notificationModel = models.notification;
const reviewModel = models.review;
const Reply = models.Reply;
const Message = models.message;
const loginModel = model.Login;
const shelterModel = model.ShelterDetails;

const Razorpay = require('razorpay');
const crypto = require('crypto');
const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
  });


exports.adddonor = async (req, res) => {
    try {
        // Create a new login entry first to get the user ID
        const loginparam = {
            email: req.body.email,
            password: req.body.password,
            userstatus: req.body.userstatus,
        };
        const login = await loginModel.create(loginparam);

        // Create a new donor entry with the obtained login ID
        const donorpraram = {
            donorname: req.body.donorname,
            place: req.body.place,
            contact: req.body.contact,
            userid: login._id ,// Use the ID from the created login
            coordinates: {
              type: 'Point',
              coordinates: [req.body.longitude, req.body.latitude]
          }
        };
        await donorModel.create(donorpraram);

        // Send success response
        res.json('success');
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.veiwDonor = async (req, res) => {
    try {
      const veiwdonor = await donorModel.find().populate('userid')

      res.json(veiwdonor);
    } catch (error) {
      console.error('Error fetching users with deposits:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.addDonation = async (req, res) => {
    try {
      const { donationname, quantity, noofusers,price, donorid } = req.body;
  
      const newDonation = new donoationModel({
        donationname,
        quantity,
        noofusers,
        price,
        donorid
      });
  
      const savedDonation = await newDonation.save();
      res.status(201).json(savedDonation);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
exports.viewDonationByDonor = async (req, res) => {
  try {
      const { donorid } = req.body;
      console.log("Received donor:", donorid);
      
      const donations = await donoationModel.find({ donorid });
      console.log("Fetched donations:", donations);

      const enhanced = await Promise.all(donations.map(async (donations) => {
          const donor = await donorModel.findOne({ _id: donations.donorid });
        
          return {
              ...donations._doc,
              donor,
            
          };
      }));

      console.log("Enhanced:", enhanced);
      res.json(enhanced);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
  }
};

exports.deletedonationbydonors = async (req, res) => {
  try {
      const deletedProduct = await donoationModel.findByIdAndDelete(req.body.id);
      if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }
      res.json({ message: 'Product deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


exports.getDonation = async (req, res) => {
  try {
      const donation = await donoationModel.findById(req.body.id);
      const donor = await donorModel.findById(donation.shopid);
      
      const enhancedDonation = {
          ...donation._doc,       
          donor,
      };
      res.json(enhancedDonation);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};




exports.updateDonation = async (req, res) => {
  try {
      
      const donationParams = {
         donationname: req.body.donationname,
          quantity: req.body.quantity,
          noofusers: req.body.noofusers,
          price:req.body.price
               
        };
     const updatedDonation= await donoationModel.findByIdAndUpdate(req.body.id, donationParams);     
      if (!updatedDonation) {
          return res.status(404).json({ error: 'product not found' });
      }   
      // Prepare enhanced medicine object
      const enhancedProduct = {
          ...updatedDonation._doc,          
      };
      res.json(enhancedProduct);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


exports.requestShelter = async (req, res) => {
  try {
    const { shelterId, donorId } = req.body;

    const shelter = await shelterModel.findByIdAndUpdate(
      shelterId,
      { is_request: 1, donorid: donorId },
      { new: true }
    );

    if (!shelter) {
      return res.status(404).json({ message: "Shelter not found" });
    }

    res.status(200).json({ message: "Request sent successfully", shelter });
  } catch (error) {
    console.error("Error updating", error);
    res.status(500).json({ message: "Error sending request" });
  }
};



exports.requestDonordetails = async (req, res) => {
  try {
    const { shelterId } = req.body;

    console.log('Received shelterId:', shelterId);

    const shelter = await shelterModel.findById(shelterId).populate({
      path: 'donorid',
      populate: {
        path: 'userid',
        model: 'login'
      }
    });

    if (!shelter) {
      console.log('Shelter not found');
      return res.status(404).json({ message: "Shelter not found" });
    }

    console.log('Shelter found:', shelter);
    console.log('Donor details:', shelter.donorid);

    res.status(200).json(shelter.donorid);
  } catch (error) {
    console.error("Error fetching donor details for shelter:", error);
    res.status(500).json({ message: "Error fetching donor details for shelter" });
  }
}


exports.getDonationsByDonorId = async (req, res) => {
  try {
    const { donorId } = req.body;

    if (!donorId) {
      return res.status(400).json({ message: 'Donor ID is required' });
    }

    console.log(`Fetching donations for donorId: ${donorId}`);
    const donations = await donoationModel.find({ donorid: donorId }).populate('donorid');

    if (donations.length === 0) {
      console.log(`No donations found for donorId: ${donorId}`);
      return res.status(404).json({ message: 'No donations found' });
    }

    console.log(`Donations found: ${donations}`);
    res.json(donations);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.approveDonors = async (req, res) => {
  try {
    const updatedDonor = await donorModel.findByIdAndUpdate(req.body.id, { is_request: 1 }, { new: true });
    res.status(200).json({ message: "Donor approved", donor: updatedDonor });
  } catch (error) {
    console.error("Error updating donor", error);
    res.status(500).json({ message: "Error approving donor" });
  }
};

exports.rejectDonors = async (req, res) => {
  try {
    const updatedDonor = await donorModel.findByIdAndUpdate(req.body.id, { is_request: 2 }, { new: true });
    res.status(200).json({ message: "Donor rejected", donor: updatedDonor });
  } catch (error) {
    console.error("Error updating donor", error);
    res.status(500).json({ message: "Error rejecting donor" });
  }
};
exports.Canceldonation = async (req, res) => {
  const { donationId, shelterId } = req.body;

  try {
    const donation = await donoationModel.findById(donationId);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    const shelter = await shelterModel.findById(shelterId);
    if (!shelter) {
      return res.status(404).json({ message: 'Shelter not found' });
    }

    // Check if the shelter already canceled this donation
    if (!donation.canceledByShelters.includes(shelterId)) {
      donation.canceledByShelters.push(shelterId);
    }
    await donation.save();

    // Create notification for the donor
    const notification = new notificationModel({
      notification: `Donation cancelled by shelter ${shelter.sheltername}`,
      donationid: donationId,
      donorid: donation.donorid
    });
    await notification.save();

    res.status(200).json({ message: 'Donation cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling donation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verify=async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id,} = req.body;
    const hmac = crypto.createHmac('sha256', process.env.KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const expectedSignature = hmac.digest('hex')
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: "Internal server error!" });
  }
}

exports.addReview = async (req, res) => {
  try {
      const { review, donorsid, sheltersid,status,label } = req.body;

    
      const newReview = new reviewModel({ review, donorsid, sheltersid,status,label });
      const savedReview = await newReview.save();

     
      res.status(201).json(savedReview);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.getReviews = async (req, res) => {
  try {
      const reviews = await reviewModel.find().populate('donorsid').populate('sheltersid');
      res.status(200).json(reviews);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};


exports.getReviewsByDonor = async (req, res) => {
  try {
      const { donorId } = req.body;
      const reviews = await reviewModel.find({ donorsid: donorId })
          .populate('donorsid')
          .populate('sheltersid');
      res.status(200).json(reviews);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
exports.profileviewDonor = async (req, res) => {
  try {
    const donor = await donorModel.findById(req.params.id).populate('userid', 'email');
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.viewDons=(req, res) => {
  const { donorid } = req.body;

  donoationModel.find({ donorid: donorid, is_start: 0 })
    .then(donations => res.json(donations))
    .catch(error => res.status(500).json({ error: error.message }));
}


exports.profileupdateDonor = async (req, res) => {
  try {
    const donor = await donorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('userid', 'email');
    
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    if (req.body.email) {
      await Login.findByIdAndUpdate(donor.userid._id, { email: req.body.email });
      donor.userid.email = req.body.email;
    }

    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getNotifications = async (req, res) => {
  const { donorId } = req.body;

  try {
    const notifications = await notificationModel.find({ donorid: donorId }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.updatePaymentStatus = async (req, res) => {
  try {
    const { donationId, shelterId } = req.body;
    await donoationModel.findByIdAndUpdate(donationId, { payment: 1, shelterid: shelterId });
    res.status(200).json({ status: 'success', message: 'Payment status updated' });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
};

exports.ViewHistory = async (req, res) => {
  try {
    const { shelterid } = req.body;

    const donations = await donoationModel.find({ shelterid, payment: 1 })
      .populate('donorid', 'donorname')
      .sort({ createdAt: -1 });

    if (!donations) {
      return res.status(404).json({ message: 'No donation history found' });
    }

    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.viewcloseddonors = async (req, res) => {
  
  try {
    const { donorid } = req.body;

    // Find all donations for the given donor with payment status 1
    const donations = await donoationModel.find({ donorid, payment: 1 })
      .populate('shelterid', 'sheltername') // Populate the shelter name if needed
      .sort({ createdAt: -1 }); // Sort by creation date, newest first

    if (!donations) {
      return res.status(404).json({ message: 'No donation history found' });
    }

    res.json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.addMessage = async (req, res) => {
  try {
    const { message, shelterid, donorid } = req.body;

    // Create a new message
    const newMessage = new Message({
      message,
      shelterid,
      donorid
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({ message: 'Message added successfully', newMessage });
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { donorId } = req.body;

    // Fetch messages for the specified donor ID
    const messages = await Message.find({ donorid: donorId }).populate('shelterid', 'sheltername');

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.sendReply= async (req, res) => {
  const { donorid, shelterid, messageid, reply } = req.body;

  try {
    const newReply = new Reply({ donorid, shelterid, messageid, reply });
    await newReply.save();
    res.status(201).json(newReply);
  } catch (error) {
    res.status(500).json({ message: 'Error adding reply', error });
  }
}

exports.getReply= async (req, res) => {
  const { shelterid } = req.body;

  try {
    const replies = await Reply.find({ shelterid }).populate('shelterid').populate('donorid');
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching replies', error });
  }
}


 exports.start=async (req, res) => {
  try {
    const { donationId } = req.body;
    const updatedDonation = await donoationModel.findByIdAndUpdate(donationId, { is_start: 1 }, { new: true });
    res.status(200).json(updatedDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update is_start to 2
exports.ontheway=async (req, res) => {
  try {
    const { donationId } = req.body;
    const updatedDonation = await donoationModel.findByIdAndUpdate(donationId, { is_start: 2 }, { new: true });
    res.status(200).json(updatedDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
exports.delevered = async (req, res) => {
  try {
    const { donationId } = req.body;
    const updatedDonation = await donoationModel.findByIdAndUpdate(donationId, { is_start: 3 }, { new: true });
    res.status(200).json(updatedDonation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.track=async (req, res) => {
try {
  const { shelterid } = req.body;
  const donationDetails = await donoationModel.find({ shelterid });
  res.status(200).json(donationDetails);
} catch (error) {
  res.status(500).json({ error: error.message });
}
}


exports.updations= (req, res) => {
  const { donationId } = req.body;

  donoationModel.findByIdAndUpdate(
    donationId,
    { is_start: 3 },
    { new: true } // Return the updated document
  )
  .then(updatedDonation => {
    if (updatedDonation) {
      res.json({ success: true, donation: updatedDonation });
    } else {
      res.status(404).json({ success: false, message: "Donation not found" });
    }
  })
  .catch(error => res.status(500).json({ success: false, error: error.message }));
}