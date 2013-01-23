


var express = require('express')
  , http = require('http');

var app = express();

app.mongoose = require('mongoose');
app.path = require('path');
app.crypto = require('crypto');

var config = require('./config.js')(app, express);


var models = {};
models.widgets = require('./models/widgets')(app.mongoose).model;

//-- API routes
require('./routes/widgets_api')(app, models.widgets);

//-- Catch all 404
app.get('*', function(req, res){
  res.send('not found', 404);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});



