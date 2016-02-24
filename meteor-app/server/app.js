Meteor.startup(function() { 
  Posts.remove({}); 
  if (Posts.find().count() === 0) {
    for (var i = 1; i <= 5; i++) {
      Posts.insert({title: "Post " + i})
    };
  }
});

Meteor.publish('posts', function() {  
  return Posts.find();
});