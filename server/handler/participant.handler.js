const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addParticipan = async (request, h) => {
  const { userId, channelId } = request.payload;

  try {
    const existUser = await prisma.participant.findFirst({
      where: {
        userId: userId,
      },
    });

    if (existUser) {
      const response = h.response({
        status: 'failed',
        message: 'user already in this channel ',
      });
      response.code(400);
      return response;
    }

    const participant = await prisma.participant.create({
      data: {
        userId: userId,
        channelId: channelId,
      },
    });

    return h
      .response({
        status: 'sucess',
        message: 'success fetching data',
        result: {
          participant,
        },
      })
      .code(200);
  } catch (error) {
    console.log(error);
    return h
      .response({
        status: 'error',
        message: 'server error!',
      })
      .code(500);
  }
};

module.exports = { addParticipan };
