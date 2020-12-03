const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')
var cors = require('cors')
var app = express()
 
//importing routes
const freelancerRoutes = require('./routes/freelancer')

// app
app.use(fileUpload())
app.use(cors('*'))
//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Database connected'))
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });
  
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
// routes middleware
app.use("/api", freelancerRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});