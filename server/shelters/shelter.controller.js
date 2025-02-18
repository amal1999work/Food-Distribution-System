const models = require('./shelter.model');
const ShelterDetails = models.ShelterDetails;
const LoginModel = models.Login;
const model = require('../Donors/donors.model');
const donorDetails = model.donordetails;

exports.addShelter = async (req, res) => {
    try {
        // Create a new login entry first to get the user ID
        const loginParams = {
            email: req.body.email,
            password: req.body.password,
            userstatus: req.body.userstatus,
        };
        const loginEntry = await LoginModel.create(loginParams);

        // Create a new shelter entry with the obtained login ID
        const shelterParams = {
            sheltername: req.body.sheltername,
            place: req.body.place,
            ownername: req.body.ownername,
            contact: req.body.contact,
            licenseno: req.body.licenseno,
            userid: loginEntry._id , // Use the ID from the created login
            coordinates: {
                type: 'Point',
                coordinates: [req.body.longitude, req.body.latitude]
            }
        };
        await ShelterDetails.create(shelterParams);

        // Send success response
        res.json('success');
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.login = async (req, res) => {
    try {
        const param = {
            email: req.body.email,
            password: req.body.password
        };

        const user = await LoginModel.findOne({ email: param.email });

        if (user && user.password === param.password) {
            const shelter = await ShelterDetails.findOne({ userid: user._id });
            const donor = await donorDetails.findOne({ userid: user._id });

            let userdata = {
                ...user.toObject()
            };

            if (shelter) {
                userdata = {
                    ...userdata,
                    ...shelter.toObject()
                };
            }

            if (donor) {
                userdata = {
                    ...userdata,
                    ...donor.toObject()
                };
            }

            req.session.user = userdata;
            res.json(userdata);
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.approveShops = async (req, res) => {
    try {
    const updatedShops = await ShelterDetails.findByIdAndUpdate(req.body.id, { is_check: 1 }, { new: true });
    res.status(200).json({ message: "approved", shop: updatedShops });
    } catch (error) {
    console.error("error updating", error);
    res.status(500).json({ message: "Error approving shop" });
    }
};
exports.rejectShops = async (req, res) => {
    try {
    const updatedShops = await ShelterDetails.findByIdAndUpdate(req.body.id, { is_check: 2 }, { new: true });
    res.status(200).json({ message: "approved", shop: updatedShops });
    } catch (error) {
    console.error("error updating", error);
    res.status(500).json({ message: "Error approving shop" });
    }
};

exports.veiwshelters = async (req, res) => {
    try {
        const veiwshelters = await ShelterDetails.find().populate('userid');

        res.json(veiwshelters);
    } catch (error) {
        console.error('Error fetching shelters:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getShelter=async(req,res)=>{
    const getshelter=await ShelterDetails.findById(req.body.id).populate('userid');
    console.log(getshelter);
    res.json(getshelter);
    
}


exports.updateShelterProfile = async (req, res) => {
    try {
        const { id } = req.body; // Get shelter ID from request body

        // Find the shelter by ID
        const shelter = await ShelterDetails.findById(id);

        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }

        // Update shelter details
        if (req.body.sheltername) {
            shelter.sheltername = req.body.sheltername;
        }
        if (req.body.place) {
            shelter.place = req.body.place;
        }
        if (req.body.ownername) {
            shelter.ownername = req.body.ownername;
        }
        if (req.body.contact) {
            shelter.contact = req.body.contact;
        }
        // Add other fields as necessary

        // Save the updated shelter details
        await shelter.save();

        return res.status(200).json({ message: 'Shelter profile updated successfully', data: shelter });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


exports.profileviewShelter = async (req, res) => {
    try {
      const shelter = await ShelterDetails.findById(req.params.id).populate('userid', 'email');
      if (!shelter) {
        return res.status(404).json({ message: 'Shelter not found' });
      }
      res.json(shelter);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.getShelter = async (req, res) => {
    const { id } = req.body;
    try {
        const shelter = await ShelterDetails.findById(id).populate('userid', 'email');
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }
        res.json(shelter);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching shelter profile', error });
    }
  }

  exports.editShelter = async (req, res) => {
    const { id, sheltername, ownername, place, contact, email } = req.body;
    try {
        const shelter = await ShelterDetails.findById(id);
        if (!shelter) {
            return res.status(404).json({ message: 'Shelter not found' });
        }

        // Update the shelter details
        shelter.sheltername = sheltername;
        shelter.ownername = ownername;
        shelter.place = place;
        shelter.contact = contact;
        await shelter.save();

        // Update the associated login email
        if (email) {
            await LoginModel.findByIdAndUpdate(shelter.userid, { email });
        }

        res.json({ message: 'Profile updated successfully', shelter });
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
}