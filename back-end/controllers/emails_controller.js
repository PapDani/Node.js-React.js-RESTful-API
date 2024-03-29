const db = require("../models");
const Email = db.emails;
const Op = db.Sequelize.Op;
// Create and Save a new Email
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
        mobilenum: `06${req.body.regionCode}${req.body.phoneNumber}`,
        email: req.body.email,
        description: req.body.description ? req.body.description : null,
        date: req.body.date,
        generatedemailid: req.body.generatedEmailId
    };
    // Save Email in the database
    Email.create(email)
      .then(data => {
        //res.send(data);
        res.status(200).send({message: "Sikeres ajánlatkérés!"})
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Hiba az adatbázisba történő feltöltéskor."
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
