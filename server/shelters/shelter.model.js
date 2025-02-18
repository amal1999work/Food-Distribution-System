const mongoose = require('mongoose');

const shelterSchema = mongoose.Schema({
    sheltername: { type: String, required: true },
    place: { type: String, required: true },
    ownername: { type: String, required: true },
    contact: { type: String, required: true },
    licenseno: { type: String, required: true },
    coordinates: {
        type: {type: String, enum: ['Point'], required: true},
        coordinates: {type: [Number], required: true}
    },
    is_check: { type: Number, default: 0 },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'login', default: null },
    donorid: { type: mongoose.Schema.Types.ObjectId, ref: 'donordetails', default: null }
    
});

const ShelterDetails = mongoose.model('shelterdetails', shelterSchema);

const loginSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userstatus: {
        type: Number,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Login = mongoose.model('login', loginSchema);

module.exports = {
    ShelterDetails: ShelterDetails,
    Login: Login
};
