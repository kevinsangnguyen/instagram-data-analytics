var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, './client')));
app.use('/scripts', express.static(__dirname + '/node_modules'));

// require('./server/config/routes.js')(app);
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
