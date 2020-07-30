const express = require('express')
const bodyparser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express();

app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(express.static('public'))





app.get('/', function (req, res) {
    res.sendFile(__dirname + '/signup.html')
})
app.post('/', function (req, res) {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;


    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName

            }

        }]
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/dfaf9395a6"
    const options = {
        method: 'POST',
        auth: 'rohit1:1d9768cde8bdadce0736624808d6f20a-us18'
    }

    const request = https.request(url, options, function (response) {


            if (response === 200) {
                res.sendFile(__dirname + "/success.html")

            } else {
                res.sendFile(__dirname + "/failure.html")
            }

            response.on("data", function (data) {
                // console.log(JSON.parse(data))
            })

        }

    )

    request.write(jsonData);
    request.end();

})
app.post("/failure", function (req, res) {
    res.redirect('/');
})

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log('server is running on port 3000')
})

//////API KEY ////

/////  1d9768cde8bdadce0736624808d6f20a-us18

//// LIst ID--- dfaf9395a6////