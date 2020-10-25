const Freelancer = require("../models/freelancer")
exports.sayHi = (req, res) => {
    res.json({message: 'hello there'});
}

// get all freelancers
exports.allFreelancers = async (req, res) => {
    try {
        const freelancers = await Freelancer.find();
        res.json(freelancers);
    } catch(err) {
        res.json({message: err});
    }
}

// get one freelancer
exports.oneFreelancer = async (req, res) => {
    try {
        const freelancer = await Freelancer.findById(req.params.freelancerId);
        res.json(freelancer);
    } catch(err) {
        res.status(404).json({message: err});
    }
}

// create new freelancer with the model Freelancer and submit
exports.createFreelancer = async (req, res) => {
    const freelancer = new Freelancer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        category: req.body.category,
        location: req.body.location,
        education: req.body.education,
        seniority: req.body.seniority,
        finnishSkills: req.body.finnishSkills,
        status: req.body.status,
        broker: req.body.broker,
        company: req.body.company,
        date: req.body.date,
        palkkatoive: req.body.palkkatoive,
        huom: req.body.huom,
        techRating: req.body.techRating,
        cultureFit: req.body.cultureFit,
        huonoa: req.body.huonoa
    });
    try{
        const savedFreelancer = await freelancer.save();
        res.status(201).json(savedFreelancer);
    } catch(err) {
        res.status(404).json({ message: err });
    }
}

exports.deleteFreelancer = async (req, res) => {
    try{
        const removeFreelancer = await Freelancer.remove({_id: req.params.freelancerId});
        res.json(removeFreelancer);
    } catch(err) {
        res.status(204).json({ message: err})
    }
}

exports.updateFreelancer = async (req, res) => {
    try{
        const updateFreelancer = await Freelancer.updateOne({ _id: req.params.freelancerId},
        { $set: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            category: req.body.category,
            location: req.body.location,
            education: req.body.education,
            seniority: req.body.seniority,
            finnishSkills: req.body.finnishSkills,
            status: req.body.status,
            broker: req.body.broker,
            date: req.body.date,
            palkkatoive: req.body.palkkatoive,
            huom: req.body.huom,
            techRating: req.body.techRating,
            cultureFit: req.body.cultureFit,
            huonoa: req.body.huonoa,
        }});
        res.json(updateFreelancer);
    } catch(err) {
        res.status(404).json({ message: err });
    }
}


exports.freelancerById = (req, res) => {
Freelancer.findById
}