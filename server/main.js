import { Meteor } from 'meteor/meteor';
import { ChatLogs } from '../api/chatlogs.js';
var kuromoji = require('kuromoji');
var builder = kuromoji.builder({
  dicPath: '../../../../../node_modules/kuromoji/dict'
});

Meteor.startup(() => {
});

Meteor.methods({
  converse: function(rcvdMsg) {
    builder.build(Meteor.bindEnvironment(function(err, tokenizer) {
      var reply = '';
      if (err) {
        console.log(err);
      } else {
        var nounFlg = false;
        var tgtNoun = '';
        var verbFlg = false;
        var adjectiveFlg = false;
                  
        tokenizer.tokenize(rcvdMsg).forEach(function(word) {
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

        console.log(reply);

        // Reply
        ChatLogs.insert({
          commenter: 1,
          text: reply,
          createdAt: new Date()
        });
      }
    }));
  }
});

