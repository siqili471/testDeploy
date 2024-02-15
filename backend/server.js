const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path')

require('dotenv').config();

const app = express();
const PORT = 4000;
const URI = process.env.MONGO_URI;
const allowEveryOrigin = true;


if (!allowEveryOrigin)
{
  //Only allows requests from one host for security, enable in production
  const corsOptions = { 
    origin : ['http://localhost:3000','http://18.134.73.137']
  } 
  app.use(cors(corsOptions))
}
else
{
  //Allows CORS from everywhere for development
  app.use(cors())
}

// MongoDB Connection
mongoose.connect(URI, {

}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// connect frontend
// const _dirname = path.dirname("")
const buildPath = path.join(__dirname, '../frontend/build');

// Routes
app.use(express.static(buildPath))
app.use('/classrooms', require('./routes/Classroom'));
app.get("/*", (req,res)=>{
  res.sendFile(
    path.join(buildPath,'index.html'),
    err=>{
      if(err){
        res.status(500).send(err);
      }
    }
  )
})


// Start Server
const IP_ADDRESS = '0.0.0.0';
app.listen(IP_ADDRESS,() => console.log(`Server running on port ${IP_ADDRESS}`));
module.exports=app