var myApp = angular.module('myApp', ['ngRoute']);

var myController = myApp.controller('myController', function($scope, $http){
    $scope.data = {
        features: [{
            icon: '',
            title: '',
            id: 0,
            description: '',
            upvotes: 0,
            downvotes: 0,
            comments: [],
            score: 0
        },{
            icon: '',
            title: '',
            id: 0,
            description: '',
            upvotes: 0,
            downvotes: 0,
            comments: [],
            score: 0
        },{
            icon: '',
            title: '',
            id: 0,
            description: '',
            upvotes: 0,
            downvotes: 0,
            comments: [],
            score: 0
        },{
            icon: '',
            title: '',
            id: 0,
            description: '',
            upvotes: 0,
            downvotes: 0,
            comments: [],
            score: 0
        },{
            icon: '',
            title: '',
            id: 0,
            description: '',
            upvotes: 0,
            downvotes: 0,
            comments: [],
            score: 0
        }],
        upvote : function(id){
            var whichFeature = parseInt(id);
            var upvotes = $scope.data.features[whichFeature].upvotes++;
            var downvotes = $scope.data.features[whichFeature].downvotes;
            $scope.data.features[whichFeature].score = $scope.data.score(upvotes, downvotes);
        },
        downvote : function(id){
            var whichFeature = parseInt(id);
            var upvotes = $scope.data.features[whichFeature].upvotes;
            var downvotes = $scope.data.features[whichFeature].downvotes++;
            $scope.data.features[whichFeature].score = $scope.data.score(upvotes, downvotes);
        },
        score: function(upvotes, downvotes){
            var score = upvotes/downvotes;
            return score;
        },
        select : function(id){
            $scope.view.main = false;
            $scope.view.feature = id;
        }
    };
    $scope.view = {
      main: true
    };
    $scope.socket = function(){
        socket = io.connect('http://localhost:3000');
        socket.on('hello', function(data){
           socket.emit('get features');
        });
        socket.on('features', function(data){
           console.log(data);
            for(var i = 0;i<data.length;i++){
                $scope.data.features[i].icon = data[i].icon;
                $scope.data.features[i].id = data[i].id;
                $scope.data.features[i].description = data[i].description;
                $scope.data.features[i].upvotes = data[i].upvotes;
                $scope.data.features[i].downvotes = data[i].downvotes;
                $scope.data.features[i].comments = data[i].comments;
                $scope.data.features[i].score = data[i].score;
                $scope.data.features[i].title = data[i].title;
            }

        });
        return socket;
    }
});
