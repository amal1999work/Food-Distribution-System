const mongoose = require("mongoose");


const DonorSchema = mongoose.Schema({
  donorname: { type: String, required: true },
  place: { type: String, required: true },
  contact: { type: Number, required: true },
  is_check: { type: Number, default: 0 },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'login', default: null },
  coordinates: {
    type: {type: String, enum: ['Point'], required: true},
    coordinates: {type: [Number], required: true}
},
is_request: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now()}
});
const donordetails = mongoose.model("donordetails", DonorSchema);



const donationSchema = mongoose.Schema({
  donationname: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  noofusers: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  donorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'donordetails',
    required: true
  },
  shelterid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shelterdetails',
 
  },
  
  is_status: { type: Number, default: 0 },
  is_start: { type: Number, default: 0 },

  payment: { type: Number, default: 0 },
  canceledByShelters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'shelterdetails' }],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const donation = mongoose.model('donation', donationSchema);

const notificationSchema = mongoose.Schema({
  notification: {
    type: String,
    required: true
  },
  donationid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'donation',
    required: true
  },
  donorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'donordetails',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const notification = mongoose.model('notification', notificationSchema);



const reviewSchema = mongoose.Schema({
  review: {
    type: String,
    required: true
  },
 
  donorsid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'donordetails',
    required: true
  },
  sheltersid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shelterdetails',
    required: true
  },
  status: {
    type: Number,
 
  },
  label: {
    type: String,
   
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const review = mongoose.model('review', reviewSchema);

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  shelterid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shelterdetails',
    required: true
  },
  donorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'donordetails',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const message = mongoose.model('message', messageSchema);

const replySchema = mongoose.Schema({
  donorid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'donordetails',
    required: true
  },
  shelterid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shelterdetails',
    required: true
  },
  messageid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'message',
    required: true
  },
  reply: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = {donordetails: donordetails,Reply:Reply,donation:donation,message:message,review:review,notification:notification};