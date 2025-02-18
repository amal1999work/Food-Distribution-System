const express = require('express')
const fileUpload = require('express-fileupload');
const path = require('path');

const db=require('./database')
var bodyParser =require('body-parser')
var cors =require('cors')
const app = express()
const session = require('express-session');
app.use(cors())
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const port = 3005
db()

const dotenv = require("dotenv");

const Razorpay = require('razorpay');

// Setting up environment variables
dotenv.config();

app.use(session({
    secret: 'your-secret-key', // Change this to a random string
    resave: false,
    saveUninitialized: false
}));
const shelterRouter=require('./shelters/shelter.router')
const donorRouter=require('./Donors/donors.router')
const UtilRouter = require('./utils/utils.router')
app.get('/',(req,res)=>{res.send('loaded')})
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/shelter',shelterRouter)
app.use('/donors',donorRouter)
app.use("/utils",UtilRouter)
app.listen(port,()=>{console.log('server is running')})

