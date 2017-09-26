import { Template } from 'meteor/templating';
import { ChatLogs } from '../api/chatlogs.js';

import './main.html';

Template.body.helpers({
  chatLogs: function () {
    return ChatLogs.find({});  
  }
  // 'commenter': function(){
  //   return PlayersList.find({}, { sort: {score: -1, name: 1} });
  // },
});

Template.addComment.events({
  'submit form': function(event){
    event.preventDefault();
    var commentVar = event.target.comment.value;

    // Comment
    ChatLogs.insert({
      commenter: 0,
      text: commentVar,
      createdAt: new Date()
    });

    // Reply
    ChatLogs.insert({
      commenter: 1,
      text: commentVar += 'ってどうなの？',
      createdAt: new Date()
    });

    event.target.comment.value = "";
  }
});
