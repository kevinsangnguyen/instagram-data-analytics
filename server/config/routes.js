var request = require('request');

module.exports = function(app) {
  app.get('/search/:username', function(req, res) {
    var url = 'https://www.instagram.com/' + req.params.username + '/media/';
    var options = {
        url: url,
    }
    function callback(error, response, body){
      if (!error && response.statusCode == 200) {
          info = JSON.parse(body);
          res.json(info);
      }
    }
    request(options,callback);
  });
}
