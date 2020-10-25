const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

//importing routes
const freelancerRoutes = require('./routes/freelancer')

// app
const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(() => console.log('Database connected'))
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });
  
// routes middleware
app.use("/api", freelancerRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});