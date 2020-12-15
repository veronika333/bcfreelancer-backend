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
        star: req.body.star,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        category: req.body.category,
        location: req.body.location,
        education: req.body.education,
        seniority: req.body.seniority,
        fi: req.body.fi,
        status: req.body.status,
        broker: req.body.broker,
        company: req.body.company,
        date: req.body.date,
        palkkatoive: req.body.palkkatoive,
        huom: req.body.huom,
        techRating: req.body.techRating,
        cultureFit: req.body.cultureFit,
        huonoa: req.body.huonoa,
        contactedBy: req.body.contactedBy,
        available: req.body.available,
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
            star: req.body.star,
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            category: req.body.category,
            location: req.body.location,
            education: req.body.education,
            seniority: req.body.seniority,
            fi: req.body.fi,
            status: req.body.status,
            broker: req.body.broker,
            company: req.body.company,
            date: req.body.date,
            contactedBy: req.body.contactedBy,
            palkkatoive: req.body.palkkatoive,
            huom: req.body.huom,
            techRating: req.body.techRating,
            cultureFit: req.body.cultureFit,
            huonoa: req.body.huonoa,
            available: req.body.available,
            lineColor: req.body.lineColor
        }});
        res.json(updateFreelancer);
    } catch(err) {
        res.status(404).json({ message: err });
    }
}

// search freelancers
exports.searchFreelancers = (req, res) => {
    // creating query object to hold search values
    const query = {}
    // assigning search value to query
if(req.query.searchedLocation
    && req.query.searchedLocation != "All"){
query.location = {$regex: req.query.searchedLocation, $options: 'i'} // i - used for case insensitivity
}
// assigning location value to query
if(req.query.category){
    //query.category = req.query.category
    query.category = {$regex: req.query.category, $options: "i"}
}
// assigning language value to query.language
if(req.query.language && req.query.language != "All")
{query.fi = {$regex: req.query.language, $options: "i"}};

// if(req.query.availableNow && req.query.availableNow != "All"){
//     query.lineColor = {$regex: req.query.availableNow, $option: "i"};
// }
if(req.query.onPhzProjectNow && req.query.onPhzProjectNow != "All")
{query.lineColor = {$regex: req.query.onPhzProjectNow, $options: "i"}};
// finding the product based on query object with 2 properties: category and searchedLocation

if (req.query.availabilityDate) {
  query.available = { $lte: req.query.availabilityDate };
 }

Freelancer.find(query, (err, freelancers) => {
if(err){
    return res.status(400).json({message: err})
}
res.json(freelancers)
})
}

// exports.freelancerById = (req, res) => {
// Freelancer.findById
// }

