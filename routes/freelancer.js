const express = require('express');
const router = express.Router()

const {sayHi, allFreelancers, oneFreelancer, 
    createFreelancer, deleteFreelancer, updateFreelancer,
    searchFreelancers,
    freelancerById,
    cv
} = require("../controllers/freelancer")

router.get('/', sayHi);
router.get('/allfreelancers', allFreelancers);
router.get('/freelancer/:freelancerId', oneFreelancer);
router.post('/createfreelancer', createFreelancer);
router.delete('/freelancer/:freelancerId', deleteFreelancer);
// router.patch('/freelancer/:freelancerId', updateFreelancer);
router.put('/freelancer/:freelancerId', updateFreelancer);
router.get('/freelancers/search', searchFreelancers);
router.get('/freelancer/cv/:freelancerId', cv)
//added
router.param('freelancerId', freelancerById)

module.exports = router;