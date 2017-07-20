app.controller('Main', ['$scope','$http','tbkKeenClient','tbkKeen', function($scope,$http,KeenClient,Keen) {
  $scope.search = function(){
    var url = 'https://www.instagram.com/' + $scope.username + '/media/';
    $http.get(url).success(function(data){
          var num = 1;
          var time_stamps = [];
          $scope.IDs = [];
          var likes = [];
          var comments = [];
          data.items.forEach(function(photo){
            var photoEvent = {
              id: photo.id,
              likes: photo.likes.count, // track dollars as cents
              comments: photo.comments.count,
              time_stamp: photo.created_time,
              poster: $scope.username,
              keen: {
                timestamp: new Date().toISOString()
              }
            };
            KeenClient.addEvent('photos', photoEvent)

            time_stamps.push(photo.created_time);
            $scope.IDs.push(num++);
            likes.push(photo.likes.count);
            comments.push(photo.comments.count)
          })

          $scope.type = 'StackedBar';
          $scope.series = ['Likes', 'Comments'];
          $scope.options = {
            scales: {
              xAxes: [{
                stacked: true,
              }],
              yAxes: [{
                stacked: true
              }]
            }
          };

          $scope.data = [likes,comments];


          //KEEN VISUAL
          $scope.query = new Keen.Query("extraction", {
            eventCollection: "photos",
            timeframe: "this_14_days",
            filters: [
              {
                property_name: "poster",
                operator: "gt",
                property_value: $scope.username
              }
            ]
          });

          $scope.chartOptions = {
            chartArea: {
              height: "85%",
              left: "5%",
              top: "5%",
              width: "100%"
            },
            pieHole: 0.4
          };
    }).error(function(){
      console.log('error')
    });
  }
}]);
