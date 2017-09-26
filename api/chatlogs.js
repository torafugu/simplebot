import { Mongo } from 'meteor/mongo';

export const ChatLogs = new Mongo.Collection('chatLogs', {idGeneration: 'MONGO'});

