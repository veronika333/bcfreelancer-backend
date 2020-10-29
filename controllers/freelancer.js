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
        name: req.body.name,
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
        huonoa: req.body.huonoa,
        contactedWhenBy: req.body.contactedWhenBy,
        lineColor: req.body.lineColor
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
        const updateFreelancer = await Freelancer.findOneAndUpdate({ _id: req.params.freelancerId},
        { $set: {
            name: req.body.name,
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
            huonoa: req.body.huonoa,
            contactedWhenBy: req.body.contactedWhenBy,
            lineColor: req.body.lineColor
        }});
        res.json(updateFreelancer);
    } catch(err) {
        res.status(404).json({ message: err });
    }
}

//search freelancers by query
// exports.freelancersBySearch = async (req, res) => {
//     //create query object to hold sear value and category value
//     const query = {};
  
//     //assign search value to query.name
//     if (req.query.search) {
//       query.name = { $regex: req.query.search, $options: "i" };
//     }
  
//     //assign category value to query.category
//     if (req.query.category && req.query.category != "All") {
//       query.category = req.query.category;
//     }
  
//     //find the product based on query product with 2 properties  - search and category
//     try {
//       const freelancers = await Freelancer.find(query).select("-photo");
//       res.json(freelancers);
//     } catch (err) {
//       return res.status(404).json({
//         error: errorHandler(err),
//       });
//     }
//   };

exports.freelancerById = (req, res) => {
Freelancer.findById
}