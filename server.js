// Basic required imports for node
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// Create an instance of express for our app and instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());

// GET call to return JSON that formats natural and unix date
app.get('/dateValues/:dateVal', (req, res, next) => {
  // Get the req data for date
  var dateVal = req.params.dateVal;
  // Options for formatting date in date view
  var dateFormattingOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if (isNaN(dateVal)) {
    var naturalDate = new Date(dateVal);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
    var unixDate = new Date(dateVal).getTime()/1000;
  } else {
    var unixDate = dateVal;
    var naturalDate = new Date(dateVal*1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
  }

  res.json({unix: unixDate, natural: naturalDate});
});

app.listen(3000, () => {
  console.log("listening...")
});