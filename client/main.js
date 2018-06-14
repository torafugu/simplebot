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

    Meteor.call('converse', commentVar, function(error, result) {});
    
    event.target.comment.value = "";
  }
});
