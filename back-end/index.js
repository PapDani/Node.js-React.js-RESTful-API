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

    //Nodemailer, link: https://nodemailer.com/about/ 
    /*
    async function main() {
      let testAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    
      let info = await transporter.sendMail({
        from: email,
        to: "papszemet@gmail.com",
        subject: "Tárgy",
        text: "Mobil: " + mobil + "\n" + "Leírás: " + description
      });
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);
    */

    //w3schools-os, link: https://www.w3schools.com/nodejs/nodejs_email.asp
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: '',
        pass: ''
      }
    });

    transporter.set("oauth2_provision_cb", (user, renew, callback) => {
      let accessToken = userTokens[user];
      if (!accessToken) {
        return callback(new Error("Unknown user"));
      } else {
        return callback(null, accessToken);
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