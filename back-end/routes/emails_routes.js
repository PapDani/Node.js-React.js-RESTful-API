module.exports = app => {
    const emails = require("../controllers/emails_controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/create", emails.create);
    // Retrieve all Tutorials
    router.get("/", emails.findAll);
    // Retrieve all published Tutorials
    router.get("/published", emails.findAllPublished);
    // Retrieve a single Tutorial with id
    router.get("/:id", emails.findOne);
    // Update a Tutorial with id
    router.put("/:id", emails.update);
    // Delete a Tutorial with id
    router.delete("/:id", emails.delete);
    // Delete all Tutorials
    router.delete("/", emails.deleteAll);
    app.use('/api/emails', router);
  };