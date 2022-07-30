//jshint esversion: 6

const express= require("express");
//const request= require("request");
const https= require("https");
const bodyparser= require("body-parser");
const app= express();
app.use(bodyparser.urlencoded({extended: true}));
// in order to serve up out static files such as custom css and images files, then we need to use a special function of express and that's called static.
app.use(express.static("public"));     //this is the necessray code for use static method here public folder is make by us in this file we put all the files we need to use;
//we have all static file in one place and express.static provide the path of out static

app.get("/", function(req, res){
    res.sendFile(__dirname  + "/index.html")
})
app.post("/", function(req, res){
const firstname= req.body.fname;
const secondname= req.body.sname;
const email= req.body.mail;
const textara= req.body.tarea;


const data= {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: secondname,
                TEXT: textara
            }
        }
    ]
}

const jsondata= JSON.stringify(data);
// console.log(firstname, secondname, emial);
const url= "https://us14.api.mailchimp.com/3.0/lists/f4d0acb37f";
const options= {
    method: "POST",
    auth: "Ritik1:0719110d440c65ad1c1fa0168ef52ae5-us14"  //basic authenitation
}
const request= https.request(url, options, function(response){
   if(response.statusCode===200){
    res.sendFile(__dirname+ "/success.html")
   }
   else{
    res.sendFile(__dirname+ "/failure.html")
   }

     response.on("data", function(data){
    console.log(JSON.parse(data));
})
})
    request.write(jsondata);
    request.end();
});

app.post("/failure", function(req, res){
        res.redirect("/");
})
// process.evn.PORT || 
app.listen(3000, function(){
    console.log("system is running");
});

// Heorku works is that it might pick and choose a port for us. a dynamic random port for us, so to enable this we have to write process.env.PORT inseted of 3000.
//our custom style page is not likned here this is a static page 
//sending our request to mailchimp

//audience Id/ list ID
//f4d0acb37f     help mailchimp to identify the list that you want to put your subscribe into.

//API key
// 2a556631f4ea68d37a8ffae275bb4168-us14
// 2a556631f4ea68d37a8ffae275bb4168-us14
// b52d1d0651cab8406cbb24b1f515db96-us14