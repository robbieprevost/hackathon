exports.set = function(Action, dataToSet){
    var action = new Action({
       title: dataToSet.title,
       data: dataToSet.data
    }).save(function(){
            console.log('saved action');
        });
};

exports.get = function(Action, Feature, io, actions){
  Action.find({}, function(err,data){
      if(data[0]) {
          var action = data[0];
          if(data[0].title == 'get features'){
              Feature.find({}, function(err, features){
                  var dataToSet = {
                      title: 'emit features',
                      data: {
                          socket: socketId,
                          features: features
                      }
                  };
                 actions.set(Action, dataToSet);
              });
          }
          if(data[0].title == 'emit features'){
              io.emit('features', data[0].data.features);
          }
          data[0].remove();
      }else{
          console.log('no actions');
      }
  });
};