const db = require("../models");
const Email = db.emails;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a record
    const email = {
        subjectid: req.body.subjectId,
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        mobilenum: req.body.mobileNum,
        email: req.body.email,
        description: req.body.description ? req.body.description : null,
        date: req.body.date,
        generatedid: req.body.generatedId
    };
    // Save Tutorial in the database
    Email.create(email)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the record."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};