const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4500;

// connect schema

require("./dbconnect.js")
const User = require("./models/user")


// bodyparser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static("views"));

// routes api login
app.get('/signin', (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

// post api signup

app.post("/signin", (req, res) => {
    let user = {};
    user.name = req.body.name;
    user.company = req.body.company;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.message = req.body.message;
    main();
    const newusers = new User(user);

    newusers.save((err) => {
        if (err) {
            console.log(err)
        } else {
            res.send(newusers);
        }
    })

    //........................Nodemailer......................//

    // create reusable transporter object using the default SMTP transport


    async function main() {


        let transporter = nodemailer.createTransport({
            host: "mail.taniskjha.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "contact@taniskjha.com", // generated ethereal user
                pass: "0^#gDB~1pObj" // generated ethereal password
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Nodemailer Contact 👻" <contact@taniskjha.com>', // sender address
            to: "frogvo@gmail.com", // list of receivers
            subject: "Node Feedback Request", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>" // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.send(`<h1>Feedback Sent</h1>`);

    }
})

// 


app.listen(port, () => {
    console.log('App listening on port 3000!');
});