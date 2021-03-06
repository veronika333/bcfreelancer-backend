const express = require('express');
const router = express.Router()

const {sayHi, allFreelancers, oneFreelancer, 
    createFreelancer, deleteFreelancer, updateFreelancer} = require("../controllers/freelancer")
// create new user
const { create } = require("../controllers/freelancer");

router.get('/', sayHi);
router.get('/allfreelancers', allFreelancers);
router.get('/freelancer/:freelancerId', oneFreelancer);
router.put('/createfreelancer', createFreelancer);
router.delete('/freelancer/:freelancerId', deleteFreelancer);
router.patch('/freelancer/:freelancerId', updateFreelancer);

module.exports = router;