var myApp = angular.module('myApp', ['ngRoute']);

var myController = myApp.controller('myController', function($scope){

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
            id: 1,
            description: '',
            upvotes: 0,
            downvotes: 0,
            comments: [],
            score: 0
        },{
            icon: '',
            title: '',
            id: 2,
            description: '',
            upvotes: 0,
            downvotes: 0,
            comments: [],
            score: 0
        },{
            icon: '',
            title: '',
            id: 3,
            description: '',
            upvotes: 0,
            downvotes: 0,
            comments: [],
            score: 0
        },{
            icon: '',
            title: '',
            id: 4,
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
            $scope.data.upvotes[$scope.data.upvotes.length] = {
                feature: whichFeature,
                vote: 1
            }
        },
        upvotes : [],
        downvotes : [],
        downvote : function(id){
            var whichFeature = parseInt(id);
            var upvotes = $scope.data.features[whichFeature].upvotes;
            var downvotes = $scope.data.features[whichFeature].downvotes++;
            $scope.data.features[whichFeature].score = $scope.data.score(upvotes, downvotes);
            $scope.data.downvotes[$scope.data.downvotes.length] = {
                feature: whichFeature,
                vote: 1
            }
        },
        score: function(upvotes, downvotes){
            var score = upvotes/downvotes;
            return score;
        },
        select : function(id){
            $scope.view.main = false;
            $scope.view.feature = id;
        },
        back : function(){
            $scope.view.main = true;
            $scope.view.feature = null;
        }
    };
    $scope.view = {
      main: true
    };

    $scope.socket = function(){
        var socket = io.connect('http://localhost:3000');
        socket.on('hello', function(data){
            socket.emit('get features');
        });
        socket.on('features', function(data){
           console.log(data);
            for(var i = 0;i<data.length;i++){
                for(var j = 0; j< $scope.data.features.length;j++) {
                    if(data[i].id == $scope.data.features[j].id) {
                        $scope.data.features[j].icon = data[i].icon;
                        $scope.data.features[j].id = data[i].id;
                        $scope.data.features[j].description = data[i].description;
                        $scope.data.features[j].upvotes = data[i].upvotes;
                        $scope.data.features[j].downvotes = data[i].downvotes;
                        $scope.data.features[j].comments = data[i].comments;
                        $scope.data.features[j].score = data[i].score;
                        $scope.data.features[j].title = data[i].title;
                    }
                }
            }
        });

       return socket;
    }
});
