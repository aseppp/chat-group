const { signUp, signIn } = require('../handler/auth.handler');
const {
  createChannel,
  getChannels,
  getChannel,
  updateChannel,
  deleteChannel,
} = require('../handler/channel.handler');

const routes = [
  // AUTH ROUTES
  {
    method: 'POST',
    path: '/signUp',
    handler: signUp,
  },
  {
    method: 'POST',
    path: '/signIn',
    handler: signIn,
  },

  // CHANNEL ROUTES
  {
    method: 'POST',
    path: '/channel',
    handler: createChannel,
  },
  {
    method: 'GET',
    path: '/channels',
    handler: getChannels,
  },
  {
    method: 'GET',
    path: '/channel/{id}',
    handler: getChannel,
  },
  {
    method: 'PATCH',
    path: '/channel/{id}',
    handler: updateChannel,
  },
  {
    method: 'DELETE',
    path: '/channel/{id}',
    handler: deleteChannel,
  },
];

module.exports = routes;
