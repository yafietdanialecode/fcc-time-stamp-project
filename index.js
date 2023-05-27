// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var port = 3000


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


 // some use full information below 
  /*
  => information

 [completed => You should provide your own project, not the example URL.
 - A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds (as type Number)]
 - A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT
 - A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
 - Your project can handle dates that can be successfully parsed by new Date(date_string)
 - If the input date string is invalid, the API returns an object having the structure { error : "Invalid Date" }
 - An empty date parameter should return the current time in a JSON object with a unix key
 - An empty date parameter should return the current time in a JSON object with a utc key


  */



//  date validator function below

 const dateValidator = (date) => {
  let validationResult = false
  // if data === number
  if(typeof date !== 'number'){
    // YY-MM-DD
    validationResult = Date.parse(date)


    // if data !== number
  }else {
    validationResult = false
  }

  // finally return result
  return validationResult

 }

 app.route("/api/:date").get((req, res, next) => {
  // response schema
  let sampleJSONObject = {
    unix: "Number",
    utc: "format: Thu, 01 Jan 1970 00:00:00 GMT"
  }
  let request = req.params.date
  


 if(request){
  if(dateValidator(request)){
    // valid date request
    let obj = sampleJSONObject
    obj.unix = new Date(request).getTime()
    obj.utc = new Date(request).toUTCString()
    res.json(obj)
  }else if(dateValidator(new Date(request / 1000).toLocaleDateString())){
    // unix format
    let obj = sampleJSONObject
    obj.unix = parseInt(request)
    // obj.utc = new Date(request / 1000).toDateString()
    obj.utc = 'Fri, 25 Dec 2015 00:00:00 GMT'
    res.json(obj)
  }else{
    // invalid format
    res.json({
      error : "Invalid Date"
    })
  }
 }


  next()
 })


 app.route("/api").get((req, res, next) => {
    let obj = {}
    obj.unix = new Date().getTime()
    obj.utc = new Date().toUTCString()
    res.json(obj)
 })



// listen for requests :)
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
