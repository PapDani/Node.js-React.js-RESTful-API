const express = require("express");
const axios = require('axios');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const nodemailer = require("nodemailer");
require("./routes/emails_routes")(app);

var corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

/*
//Nethelyes
const db = mysql.createPool({
    host: 'mysql.nethely.hu',
    user: 'ideashare',
    password: 'KozosAdatbazis1',
    database: 'projekt01'
});
*/


/*
//XAMPP localhost Adatbázis kapcsolódás
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'projekt01'
});
*/

/////////////////// E-mail küldés ///////////////////
var idCounter = 1;

app.post("/api/1", (req, res) => {
    const name = req.body.name;
    const mobil = req.body.mobil;
    const email = req.body.email;
    const description = req.body.description;

    const current = new Date();
    const minutes = String(current.getMinutes()).padStart(2, "0");
    const month = String(current.getMonth() + 1).padStart(2, "0");
    const seconds = String(current.getSeconds()).padStart(2, "0");
    const dateId = `${current.getFullYear()}${month}${current.getDate()}-${current.getHours()}${minutes}${seconds}`;
    const dateForDatabase = `${current.getFullYear()}.${month}.${current.getDate()}.-${current.getHours()}:${minutes}:${seconds}`; //adatbázisba, ez alapján nézzük, hogy ne spamoljon

    //meg kell nézni, hogy van-e benne pont
    var removedSpaceString = name.replace(/\s+/g, '');
    var removedSpaceStringLowerCase = removedSpaceString.toLowerCase();
    var removedSpaceStringLowerCaseRemovedComma = removedSpaceStringLowerCase.split(".").join('');

    const subjectId = removedSpaceStringLowerCaseRemovedComma + "-" + idCounter + "-" + dateId;

    console.log("subjectId: " + subjectId);
   // res.status(200).send({message: "Sikeres kommunikáció", name, mobil, email, description});



    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
          user: '',
          pass: ''
      }
    });

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




      app.post(
        'http://localhost:3000/api/emails/create',
        { json: { subjectid: subjectId, name: name, mobil: mobil, email:email, description: description, date: dateForDatabase, generatedId: subjectId} },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
      );


    /*  let config = {
          headers: {
              header1: value,
          }
      }*/
      
      let data = {
        'subjectid': subjectId,
        'name': name,
        'mobil': mobil,
        'email': email,
        'description': description,
        'date': dateForDatabase,
        'generatedId': subjectId
      }
      
      
      axios.post('http://localhost:3000/api/emails/create', data,config)
        .then(function (response) {
          console.log(response);
        })



        res.status(200).send("Sikeres E-mail küldés!")
        console.log('Email sent: ' + info.response + info.messageId); //info.messageId küldjük adatbázisba
        idCounter++;
        // Ha lenullázódna, vagy leáll a szerver stb. Akkor az adatbázisból olvassa ki az értéket és azt használja
      }
    });
});




const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});