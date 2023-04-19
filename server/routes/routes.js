const express = require('express');
const routes = express.Router();

const { signUp, signIn } = require('../handler/auth.handler');
routes.post('/signUp', signUp);
routes.post('/signIn', signIn);

const {
  createChannel,
  getChannels,
  getChannel,
  updateChannel,
  deleteChannel,
} = require('../handler/channel.handler');

routes.post('/channel', createChannel);
routes.get('/channels', getChannels);
routes.get('/channel/:id', getChannel);
routes.patch('/channel/:id', updateChannel);
routes.delete('/channel/:id', deleteChannel);

const { sendMessage, deleteMessage } = require('../handler/message.handler');
routes.post('/message', sendMessage);
routes.post('/message/:id', deleteMessage);

const {
  addParticipan,
  removeParticipant,
  // getParticipants,
  // getParticipantByChannel,
} = require('../handler/participant.handler');
routes.post('/participant', addParticipan);
routes.post('/participant/leave', removeParticipant);
// routes.post('/participant', addParticipan);
// routes.post('/participant', addParticipan);

module.exports = routes;
