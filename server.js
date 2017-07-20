var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, './client')));
app.use('/scripts', express.static(__dirname + '/node_modules'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// require('./server/config/routes.js')(app);
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
