import { Template } from 'meteor/templating';
import { ChatLogs } from '../api/chatlogs.js';
import './main.html';

Template.body.helpers({
  chatLogs: function () {
    return ChatLogs.find({});  
  }
});

Template.addComment.events({
  'submit form': function(event){
    event.preventDefault();
    var commentVar = event.target.comment.value;

    // Call
    ChatLogs.insert({
      commenter: 0,
      text: commentVar,
      createdAt: new Date()
    });

    Meteor.call('converse', commentVar, function(err, result) {
      if (err) {
        alert(err);
      }
    });
    
    event.target.comment.value = "";
  }
});
