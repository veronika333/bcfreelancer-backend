const express = require('express');
const router = express.Router()

const {sayHi, allFreelancers, oneFreelancer, 
    createFreelancer, deleteFreelancer, updateFreelancer,
    searchFreelancers
} = require("../controllers/freelancer")

router.get('/', sayHi);
router.get('/allfreelancers', allFreelancers);
router.get('/freelancer/:freelancerId', oneFreelancer);
router.put('/createfreelancer', createFreelancer);
router.delete('/freelancer/:freelancerId', deleteFreelancer);
router.patch('/freelancer/:freelancerId', updateFreelancer);
router.get('/freelancers/search', searchFreelancers);

module.exports = router;