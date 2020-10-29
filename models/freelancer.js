const mongoose = require('mongoose');

const FreelancerSchema = mongoose.Schema({
  star: {
   type: String,
  },
   name: {
   type: String,
   required: true,
  },
 phone: {
  type: Number,
  },
 email: {
     type: String,
     trim: true, 
     unique: true
 }, 
 category: {
type: String,
required: true,
 },
 location: {
type: String,
 },
 education: {
    type: String,
 },
 seniority: {
    type: String,
 },
 fi: {
 type: String,
 },
 status: {
    type: String,
 },
 broker: {
    type: String
 },
 company: {
     type: String
 },
 date: {
type: String,
 },
 palkkatoive: {
type: String
 },
 huom: {
type: String
 },
 techRating: {
type: String
 }, 
 cultureFit: {
type: String
 },
 huonoa: {
type: String
 },
 contactedBy: {
    type: String
 },
 available: {
    type: String
 },
 lineColor: {
    type: String
 }
});

module.exports = mongoose.model("Freelancer", FreelancerSchema);