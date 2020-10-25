const mongoose = require('mongoose');

const freelancerSchema = new mongoose.Schema({
_id: new mongoose.Schema.Types.ObjectId,
 fisrtName: {
   type: String,
   required: true,  
   maxlength: 25
 },
 lastName: {
    type: String,
    required: true,  
    maxlength: 30
  },
 phone: {
  type: Number,
  required: true
  },
 email: {
     type: String,
     trim: true, 
     required: true,
     unique: true
 }, 
 category: {
type: String,
required: true,
 },
 location: {
type: String,
required: true
 },
 education: {
    type: String,
    required: true
 },
 seniority: {
    type: String,
    required: true
 },
 finnishSkills: {
 type: Boolean,
 required: true
 },
 status: {
    type: String,
    required: true
 },
 broker: {
    type: String
 },
 date: {
type: Date,
 },
 palkkatoive: {
type: Number
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
 }
});

module.exports = mongoose.model("Freelancer", freelancerSchema);