const express = require("express");
const axios = require('axios');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const nodemailer = require("nodemailer");
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./routes/emails_routes")(app);

var corsOptions = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"]
};



const db = require("./models");
const { response } = require("express");
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
  if (!req.body.firstName || !req.body.lastName || !req.body.mobileNum || !req.body.email) {
    res.status(400).send({
      message: "Kérem töltse ki a szükséges mezőket!"
    });
    return;
  }else{

      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const mobileNum = req.body.mobileNum;
      const email = req.body.email;
      const description = req.body.description;

      const formDatas =
      {
        firstName,
        lastName,
        mobileNum,
        email,
        description
      };

      const current = new Date();
      const minutes = String(current.getMinutes()).padStart(2, "0");
      const month = String(current.getMonth() + 1).padStart(2, "0");
      const seconds = String(current.getSeconds()).padStart(2, "0");
      const dateId = `${current.getFullYear()}${month}${current.getDate()}-${current.getHours()}${minutes}${seconds}`;
      const dateForDatabase = `${current.getFullYear()}.${month}.${current.getDate()} ${current.getHours()}:${minutes}:${seconds}`; //adatbázisba, ez alapján nézzük, hogy ne spamoljon

      req.body.date = dateForDatabase; //az adatbázishoz kell

    

    //meg kell nézni, hogy van-e benne pont

      var name = lastName + firstName;
      var removedSpaceString = name.replace(/\s+/g, '');
      var removedSpaceStringLowerCase = removedSpaceString.toLowerCase();
      var removedSpaceStringLowerCaseRemovedComma = removedSpaceStringLowerCase.split(".").join('');

      const subjectId = removedSpaceStringLowerCaseRemovedComma + "-" + idCounter + "-" + dateId;
      req.body.subjectId = subjectId;

    SendMail(req, res, email, subjectId, formDatas);
  }
});



function SendMail(req, res, email, subjectId, formDatas){

  try{
    const dotenv = require('dotenv');
    dotenv.config();
    const decodedKey = Buffer.from(process.env.KEY, 'base64').toString('utf8');
    const decodedEmailAddress = Buffer.from(process.env.EMAIL_ADDRESS, 'base64').toString('utf8');


    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
          user: decodedEmailAddress,
          pass: decodedKey
      }
    });

    var mailOptions = {
      from: email, //Az email küldésre használt email fiók címe jelenik meg, meg kéne változtatni
      //to: '', //HAVER emailja
      to: 'papszemet@gmail.com',
      subject: subjectId,
      text: "Név: " + formDatas.lastName + " " + formDatas.firstName + "\n" + "Mobil: " + formDatas.mobileNum + "\n" + "Leírás: " + formDatas.description
    };

      //EMAIL KÜLDÉS//
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(403).send({message: "Technikai hiba, az e-mail küldés sikertelen."});
        console.log("Email sending error: " + error);
      } else {
        if(info.accepted){
          idCounter++; // megírandó: Ha lenullázódna, vagy leáll a szerver stb. Akkor az adatbázisból olvassa ki az értéket és azt használja
          console.log("idCounter: " + idCounter);
        }
        else{
          console.log("info.accepted: hiba!!! Nem növekedett az idCounter.");
        }
        UploadToDatabase(req, res, info);
      }
    });
  }catch(error){
    res.status(500).send({message: "Szerver hiba!"});
    console.log("SendMail hiba: " + error);
  }

  

//Kommentek
{
// /*
//       app.post( //azóta firstname és lastname van
//         'http://localhost:3000/api/emails/create',
//         { json: { subjectid: subjectId, name: name, mobileNum: mobileNum, email:email, description: description, date: dateForDatabase, generatedId: subjectId} },
//         function (error, response, body) {
//             if (!error && response.statusCode == 200) {
//                 console.log(body);
//             }
//         }
//       );
// */
// /*
//       let config = {
//           headers: {
//               header1: value,
//           }
//       }
// */
    //  /*
    //   let data = {
    //     'subjectid': subjectId,
    //     'name': name,
    //     'mobileNum': mobileNum,
    //     'email': email,
    //     'description': description,
    //     'date': dateForDatabase,
    //     'generatedId': subjectId
    //   }
    //   */

//  /*     axios.post('/api/emails/create', data,config)
//         .then(function (response) {
//           console.log(response);
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//   */
}   
    
};

function UploadToDatabase(req, res, info){
  req.body.generatedEmailId = info.messageId //info.messageId-t küldjük adatbázisba
   
    //email feltöltése az adatbázisba a cotroller meggívásával (a /api/1-nek a req-jét és res-jét használja, de valószínűleg nem gond)
    const emails = require("./controllers/emails_controller.js");
    emails.create(req,res); //itt fut bele a controllers/emails_controller.js-be

    
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});