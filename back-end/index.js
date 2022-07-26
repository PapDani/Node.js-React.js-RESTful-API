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

var idCounter = 1;

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

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {

      }
    });

    const current = new Date();
    const date = `${current.getFullYear()}${current.getMonth() + 1}${current.getDate()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;

    var removedSpaceString = name.replace(/\s+/g, '');
    var removedSpaceStringLowerCase = removedSpaceString.toLowerCase();
    const subjectId = removedSpaceStringLowerCase + "-" + idCounter + "-" + date;


    var mailOptions = {
      from: email, //Az email küldésre használt email fiók címe jelenik meg, meg kéne változtatni
      //to: '', //HAVER emailja
      to: '',
      subject: subjectId,
      text: "Név: " + name + "\n" + "Mobil: " + mobil + "\n" + "Leírás: " + description
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log("Email sending error: " + error);
      } else {
        console.log('Email sent: ' + info.response);
        idCounter++;
        // Ha lenullázódna, vagy leáll a szerver stb. Akkor az adatbázisból olvassa ki az értéket és azt használja
      }
    });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});