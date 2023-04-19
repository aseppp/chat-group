const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('connected to client: ', socket.id);

    // LOAD MESSAGE
    socket.on('load message', async (payload) => {
      const channelId = payload;

      try {
        const data = await prisma.message.findMany({
          where: {
            channelId: channelId,
          },
          include: {
            author: true,
          },
        });

        socket.broadcast.emit('messages', data);
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
      console.log('client disconnect');
    });
  });
};

module.exports = socketIo;
