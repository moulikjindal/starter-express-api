//javascript file for newslette
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const port = 3000

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
    }
);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const name = req.body.name;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: name
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/d8aedbce0b";
    const options = {
        method: "POST",
        auth: "saurabh:03b1ab38b0ef31283111d1de6b5226c3-us10"
    };
    const request = https.request(url, options, function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
    // request.write(jsonData);
    request.end();
}
);
app.post("/failure", function(req, res){
    res.redirect("/");
});
// api key
// 03b1ab38b0ef31283111d1de6b5226c3-us10

// list id
// d8aedbce0b