const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const connectDB = require('./config/db')
//Load env vars
dotenv.config({path:'./config/config.env'});

//COnnect to daatabase
connectDB();
const app=express();
app.use(express.json());

const hospitals = require('./routes/hospitals');
const auth = require('./routes/auth');
app.use('/api/v1/hospitals',hospitals);
app.use('/api/v1/auth',auth);
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,console.log('Server running in ', process.env.NODE_ENV, 'mode on port ', PORT));

//Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
console.log( `Error: ${err.message}`);
//Close server & exit process
server.close(()=>process.exit(1));
});