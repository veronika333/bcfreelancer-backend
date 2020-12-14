const formidable = require('formidable');
const _ = require("lodash");
const fs = require('fs')
const str2ab = require('string-to-arraybuffer')

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

// middlewear: freelancer by id
// exports.freelancerById = (req, res, next, id) => {
//     Freelancer.findById(id).exec((err, freelancer) => {
// if(err || !freelancer){
//     return res.status(400).json({
//         error: "Freelancer not found"
//     })
// }
// req.freelancer = freelancer
// next();
//     })
// }
exports.freelancerById = async (req, res, next, id) => {
    await Freelancer.findById(id)
      .exec((err, freelancer) => {
        if (err || !freelancer) {
          res.status(400).json({
            error: "Freelancer with the given ID is not found!",
          });
        }
        req.freelancer = freelancer; //make found freelancer available in the req.freelancer
        next();
      });
  };
  

exports.oneFreelancer = (req, res) => {
    req.freelancer.cv = undefined;
    return res.json(req.freelancer)
}

// create new freelancer with the model Freelancer and submit
exports.createFreelancer = (req, res) => {
    let form = new formidable.IncomingForm()
form.keepExtensions= true
form.parse(req, (err, fields, files) => {
    if(err){
        return res.status(400).json({
            error: 'CV could not be uploaded' 
        })
    }
   // console.log('Fields, fields')
   // check for required fields
   const { name, email, category } = fields
   if(!name || !email || !category) {
    return res.status(400).json({
        error: 'Name, email and category fields are required' 
    })
   }
const freelancer = new Freelancer(fields)
//1kb = 1000
//1mb = 1000000
if(files.cv){
    //console.log('Files cv: ', files.cv)
    if(files.cv.size > 1000000){
        return res.status(400).json({
            error: "CV file size should be less than 1mb"
        })
    }
    freelancer.cv.data = fs.readFileSync(files.cv.path)
    freelancer.cv.contentType = files.cv.type
}
// freelancer.save((err, result) => {
// if(err) {
//     return res.status(400).json({
//         message: err
//     })
// }
// res.json(result)
// })
try {
    freelancer.save();
    res.status(201).json({
      freelancer,
    });
    console.log("Created a new freelancer", freelancer);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    })
    }
})
}

exports.deleteFreelancer = (req, res) => {
    const freelancer = req.freelancer
    freelancer.remove((err, deletedFreelancer) => {
if(err) {
    return res.status(400).json({
        message: err
    })
}
res.json({
    // deletedFreelancer,
    "message": "Freelancer was deleted successfully"
})
    })
}

exports.uploadCVFreelancer = async (req, res) => {
    if(!req.files.cv) {
        return res.status(400).json({
            error: 'CV could not be uploaded' 
        })
    }
    const { data, mimetype } = req.files.cv
    const cv = { data, contentType: mimetype }
    try {
        const freelancer = await Freelancer.findOneAndUpdate(
            { _id: req.freelancer._id },
            { $set: { cv } },
            { new: true }
        );
        return res.status(200).json(freelancer)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

// updating with pdf
exports.updateFreelancer = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        console.log(files)
        if(err){
            return res.status(400).json({
                error: 'CV could not be uploaded' 
            })
        }
        // check for required fields
        const { name, email, category } = fields
        //    if(!name || !email || !category) {
        //     return res.status(400).json({
        //         error: 'Name, email and category fields are required' 
        //     })
        //    }
        let freelancer = req.freelancer
        freelancer = _.extend(freelancer, fields);
        //1kb = 1000
        //1mb = 1000000
        if(files.cv){
            console.log('Files cv: ', files.cv)
            if(files.cv.size > 1000000){
                return res.status(400).json({
                    error: "CV file size should be less than 1mb"
                }).send()
            }
            freelancer.cv.data = fs.readFileSync(files.cv.path)
            freelancer.cv.contentType = files.cv.type
        }
        freelancer.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    message: err
                }).send()
            }
            res.json(result)
        })
        res.status(200).send()
    })
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
Freelancer.find(query, (err, freelancers) => {
if(err){
    return res.status(400).json({message: err})
}
res.json(freelancers)
})
}

exports.cv = (req, res, next) => {
    if(req.freelancer.cv.data){
        res.set('Content-Type', req.freelancer.cv.contentType)
        return res.send(req.freelancer.cv.data)
    }
    next();
};

exports.deleteCV = async (req, res) => {
    try {
   const freelancer = await Freelancer.findOneAndUpdate(
       {_id: req.freelancer._id},
       {$unset: req.freelancer.cv},
       {new: true},
   );
   res.json({freelancer})
     } catch(err){
         res.status(400).json({message: err})
     }
   
}

exports.removeCV = async (req, res) => {
try {
          const freelancer = await Freelancer.findOneAndUpdate(
            { _id: req.freelancer._id },
            { $unset: { cv: '' } },
            { new: true }
          );
          res.json( {freelancer} );
        } catch (err) {
          res.status(400).json({
            error: "You are not authorised to perform this action",
          });
        }
}

// exports.update = async (req, res) => {
//     try {
//       const user = await User.findOneAndUpdate(
//         { _id: req.profile._id },
//         { $set: req.body },
//         { new: true }
//       );
//       res.json({ user });
//     } catch (err) {
//       res.status(400).json({
//         error: "You are not authorised to perform this action",
//       });
//     }
//   };