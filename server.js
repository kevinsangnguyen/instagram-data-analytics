var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, './client')));
app.use('/scripts', express.static(__dirname + '/node_modules'));

// require('./server/config/routes.js')(app);

app.listen(8000, function() {
  console.log('cool stuff on: 8000');
});
