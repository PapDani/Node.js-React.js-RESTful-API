const express = require("express");
const axios = require('axios');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
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


/////////////////// Captcha ///////////////////

app.post(process.env.CAPTCHA_URL, async (req, res) => {
  //Destructuring response token from request body
      const {token} = req.body;

  //sends secret key and response token to google
      await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}`
        );
  //check response status and send back to the client-side
        if (res.status(200)) {
          res.send("Human 👨 👩");
      }else{
        res.send("Robot 🤖");
      }
  });


/////////////////// E-mail küldés ///////////////////
var idCounter = 1;
const nameRegex = /[!$%^&*()_+|~=`{}\[\]:\/;<>?,@#]/;
const phoneRegex = /(^[0-9]+$|^$)/;
const splitRegEx = /[.@]/;
const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let warningMessage = "";

function firstNameValidation(firstName, res){
  if(firstName.match(nameRegex)){
    warningMessage = "Szerver: Hibás vezetéknév formátum!";
    return true;
  }

  if(firstName.length < 2){
    console.log("firstName validáció, kisebb, mint 3");
    warningMessage = "Szerver: Túl rövid keresztnév!";
    return true;
  }
  return false;
}

function lastNameValidation(lastName, res){
  if(lastName.match(nameRegex)){
    warningMessage = "Szerver: Hibás keresztnév formátum!";
    return true;
  }

  if(lastName.length < 2){
    console.log("lastName validáció, kisebb, mint 3");
    warningMessage = "Szerver: Túl rövid vezetéknév!";
    return true;
  }
  return false;
}

function phoneNumberValidation(regionCode, phoneNumber, res){
  if(!phoneNumber.match(phoneRegex)){
    warningMessage = "Szerver: Hibás telefonszám formátum!";
    return true;
  }
  
  if(regionCode === 20 || regionCode === 30 || regionCode === 70){
    if(phoneNumber.length !== 7){
      warningMessage = "Szerver: Nem megfelelő hosszúságú mobiltelefonszám!";
      return true;
    }
  }

  if(!regionCode === 20 || !regionCode === 30 || !regionCode === 70){
    if(phoneNumber.length !== 6){
      warningMessage = "Szerver: Nem megfelelő hosszúságú vezetékestelefonszám!";
      return true;
    }
  }
  
  return false;
}

function emailValidation(email, res){
  let [userName = "", domainName = "", domain = ""] = email.split(splitRegEx);

  if(!userName || !domainName || !domain){
    warningMessage = "Szerver: Hiányos email cím!";
    return true;
  }

  if(email.length < 9){
    warningMessage = "Szerver: Nem megfelelő hosszúságú email cím!";
    return true;
  }

  if(!email.match(emailRegEx)){
    warningMessage = "Szerver: Hibás email cím fomrátum!";
    return true;
  }
}

function descriptionValidation(description, res){
  if(description.length > 1000){
    warningMessage = "Szerver: Túl hosszú leírás!";
    return true;
  }
}


app.post(process.env.MAIL_URL, (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.regionCode || !req.body.phoneNumber || !req.body.email) {
    res.status(400).send({
      message: "Kérem töltse ki a szükséges mezőket!"
    });
    return;
  }else{

      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      //const mobileNum = req.body.mobileNum;
      const regionCode = req.body.regionCode;
      const phoneNumber = req.body.phoneNumber;
      const email = req.body.email;
      const description = req.body.description;

      //mobil vagy vezetékes, körzetszám

      if(firstNameValidation(firstName, res)){
        res.status(400).send({alertType: "warning", message: warningMessage, alertTitle: "Hibás kitöltés"});
        console.log("hiba firstName");
        return;
      }

      if(lastNameValidation(firstName, res)){
        res.status(400).send({alertType: "warning", message: warningMessage, alertTitle: "Hibás kitöltés"});
        console.log("hiba lastName");
        return;
      }

      if(phoneNumberValidation(regionCode, phoneNumber, res)){
        res.status(400).send({alertType: "warning", message: warningMessage, alertTitle: "Hibás kitöltés"});
        console.log("hiba phoneNumber");
        return;
      }

      if(emailValidation(email, res)){
        res.status(400).send({alertType: "warning", message: warningMessage, alertTitle: "Hibás kitöltés"});
        console.log("hiba email");
        return;
      }

      if(descriptionValidation(description, res)){
        res.status(400).send({alertType: "warning", message: warningMessage, alertTitle: "Hibás kitöltés"});
        console.log("hiba description");
        return;
      }
      
      let phoneNumberComplete = `06${regionCode}${phoneNumber}`;

      //Spam ellenőrzés
      /* const sqlSelect = "SELECT `mobilnumber`, `email`, `date` FROM `emails` WHERE mobilenumber = ? AND email = ?;";

      db.query(sqlSelect, [phoneNumberComplete, email], (err, result) => {
        if(err){
          res.status(500).send({alertType: "error", message: "Hiba az adatbázisban szereplő adatok ellenőrzésekor!", alertTitle: "Adatbázis hiba"});
          console.log("hiba adatbázissal való ellenőrzéskor", err);
          return;
        }

        if(result.mobilnumber === phoneNumberComplete && result.email === email){
          console.log("egyezzés");
          return;
        }
      }) */

      const formDatas =
      {
        firstName,
        lastName,
        phoneNumberComplete,
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

      var name = firstName + lastName;
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

    const decodedKey = Buffer.from(process.env.EMAIL_KEY, 'base64').toString('utf8');
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
      from: email, //Az email küldésre használt email fiók címe jelenik meg, meg kéne változtatni -- valszeg fölösleges megváltoztatni
      //to: '', //HAVER emailja
      to: 'papszemet@gmail.com', //'papszemet@gmail.com',
      subject: subjectId,
      text: "Név: " + formDatas.firstName + " " + formDatas.lastName + "\n" + "Telefonszám: " + formDatas.phoneNumberComplete + "\n" + "Email: " + formDatas.email + "\n" + "Leírás: " + formDatas.description
    };

      //EMAIL KÜLDÉS//
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        res.status(403).send({alertType: "error", message: "Technikai hiba, az e-mail küldés sikertelen.", alertTitle: "Szerver hiba!"});
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