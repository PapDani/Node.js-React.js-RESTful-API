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
          user: '',
          pass: ''
      }
    });

    const current = new Date();
    const minutes = String(current.getMinutes()).padStart(2, "0");
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const seconds = String(current.getSeconds()).padStart(2, "0")
    const dateId = `${current.getFullYear()}${month}${current.getDate()}-${current.getHours()}${minutes}${seconds}`;
    const dateForDatabase = `${current.getFullYear()}.${month}.${current.getDate()}.-${current.getHours()}:${minutes}:${seconds}`; //adatbázisba, ez alapján nézzük, hogy ne spamoljon

    //meg kell nézni, hogy van-e benne pont
    var removedSpaceString = name.replace(/\s+/g, '');
    var removedSpaceStringLowerCase = removedSpaceString.toLowerCase();
    var removedSpaceStringLowerCaseRemovedComma = removedSpaceStringLowerCase.split(".").join('');

    const subjectId = removedSpaceStringLowerCaseRemovedComma + "-" + idCounter + "-" + dateId;

    console.log("subjectId: " + subjectId);


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
        console.log('Email sent: ' + info.response + info.messageId); //info.messageId küldjük adatbázisba
        idCounter++;
        // Ha lenullázódna, vagy leáll a szerver stb. Akkor az adatbázisból olvassa ki az értéket és azt használja
      }
    });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});