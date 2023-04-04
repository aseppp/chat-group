const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addParticipan = async (request, h) => {
  const { userId, channelId } = request.payload;

  try {
    const existUser = await prisma.channel.findFirst({
      where: {
        users: {
          some: {
            userId: userId,
            channelId: channelId,
          },
        },
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
      include: {
        user: true,
        channel: true,
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
      .code(201);
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

const removeParticipant = async (request, h) => {
  const { userId, channelId } = request.payload;
  try {
    const participant = await prisma.participant.delete({
      where: {
        userId_channelId: {
          userId: userId,
          channelId: channelId,
        },
      },
    });

    return h
      .response({
        status: 'sucess',
        message: 'success leave channel',
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

const getParticipants = async (request, h) => {
  try {
    const participants = await prisma.participant.findMany();
    return h
      .response({
        status: 'sucess',
        message: 'success fetching data',
        result: {
          participants,
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

const getParticipantByChannel = async (request, h) => {
  const { channelId } = request.params;

  try {
    const participant = await prisma.participant.findMany({
      where: {
        channelId: channelId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
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

module.exports = {
  addParticipan,
  removeParticipant,
  getParticipants,
  getParticipantByChannel,
};
