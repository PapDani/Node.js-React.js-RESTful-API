const express = require("express");
const cors = require('cors');

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.use(express.json());

app.post("/api/1", (req, res) => {
  const name = req.body.name;
  const mobil = req.body.mobil;
  const email = req.body.email;
  const description = req.body.description;

  /*
    if(!name === "" && !mobil === "" && !email === ""){
      res.status(200).send({message: "Sikeres kommunikáció"});
    }
    else{
      res.status(500).send({message: "Üresek, valami nem jó!"});
    }
  */

    res.status(200).send({message: "Sikeres kommunikáció", name, mobil, email, description});

    /*
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: '',
          pass: ''
      }
    });
    */

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
          user: '',
          pass: ''
      }
    });

    var mailOptions = {
      from: email,
      to: '',
      subject: 'Sending Email using Node.js - Tárgy',
      text: "Név: " + name + "\n" + "Mobil: " + mobil + "\n" + "Leírás: " + description
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});