import { Meteor } from 'meteor/meteor';
import { ChatLogs } from '../api/chatlogs.js';

var kuromoji = require('kuromoji');
var builder = kuromoji.builder({
  dicPath: 'C:/Users/1019547/simplebot/node_modules/kuromoji/dict'
});

// const bound = Meteor.bindEnvironment((callback) => {callback()});

Meteor.startup(() => {
});

Meteor.methods({
  // helloメソッドの定義
  converse: function(rcvdMsg) {
 
    // Call
    ChatLogs.insert({
      commenter: 0,
      text: rcvdMsg,
      createdAt: new Date()
    });

    console.log(morph(rcvdMsg));

    // Reply
    ChatLogs.insert({
      commenter: 1,
      text: morph(rcvdMsg),
      createdAt: new Date()
    });           
  }
});

function morph(rcvdMsg) {builder.build(function(err, tokenizer) {
  if(err) {
    console.log(err);
    //throw new Meteor.Error(err);
  } else {
    
    var analyzedResult = tokenizer.tokenize(rcvdMsg);
    var nounFlg = false;
    var tgtNoun = '';
    var verbFlg = false;
    var adjectiveFlg = false;
    var reply;

    analyzedResult.forEach(function(word) {
      switch (word.pos) {
        case '名詞':
            nounFlg = true;
            tgtNoun = word.surface_form;
            break;
        case '動詞':
            verbFlg = true;
            break;
        case '形容詞':
            adjectiveFlg = true;
            break;
      }
    });

    if (nounFlg) {
      reply = tgtNoun + 'ってなに？';
    } else {
      reply = 'どゆこと？';
    }
    console.log('1.' + reply);
  }
})};

