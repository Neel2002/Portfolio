const express = require('express')
const nodemailer= require('nodemailer')
const bodyParser = require("body-parser")
require('dotenv').config();

const app= express();

app.use(express.static(__dirname+ "/public"));
app.set("views" + __dirname + "/views");

app.set("view engine", "ejs");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(5000, ()=>{
    console.log("Listening on port 5000")
})

app.get("/",(req, res)=>{
    res.render("home")
})

app.post("/contact",(req,res)=>{
    console.log(req.body);
    
    const receiverClient = "neel02.shah@gmail.com";
    const subjectClient = "New Contact from portfolio site";
    const htmlClient = `<p>
    Contact's details: <br/>
        name: ${req.body.name}<br/>
        email: ${req.body.email}<br/>
        subject: ${req.body.subject}<br/>
        message: ${req.body.message}<br/>
    </p>`;

    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: process.env.OUTLOOK_EMAIL,
            pass: process.env.OUTLOOK_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.OUTLOOK_EMAIL, // sender address
        to: receiverClient, // list of receivers
        subject: subjectClient,
        html:htmlClient,
    };

    transporter.sendMail(mailOptions,async (err,info)=>{
        if(err) throw Error(err);
        console.log(info);
        res.redirect("/");
    });

})