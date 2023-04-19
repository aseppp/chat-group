const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addParticipan = async (request, response) => {
  const { userId, channelId } = request.body;

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
      response.status(400).send({
        status: 'failed',
        message: 'user already in this channel ',
      });
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

    response.status(201).send({
      status: 'sucess',
      message: 'success fetching data',
      result: {
        participant,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: 'error',
      message: 'server error!',
    });
  }
};

const removeParticipant = async (request, response) => {
  const { userId, channelId } = request.body;

  try {
    const participant = await prisma.participant.delete({
      where: {
        userId_channelId: {
          userId: userId,
          channelId: channelId,
        },
      },
    });

    response.status(200).send({
      status: 'sucess',
      message: 'success leave channel',
      result: {
        participant,
      },
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: 'error',
      message: 'server error!',
    });
  }
};

// const getParticipants = async (request, h) => {
//   try {
//     const participants = await prisma.participant.findMany();
//     return h
//       .response({
//         status: 'sucess',
//         message: 'success fetching data',
//         result: {
//           participants,
//         },
//       })
//       .code(200);
//   } catch (error) {
//     console.log(error);
//     return h
//       .response({
//         status: 'error',
//         message: 'server error!',
//       })
//       .code(500);
//   }
// };

// const getParticipantByChannel = async (request, h) => {
//   const { channelId } = request.params;

//   try {
//     const participant = await prisma.participant.findMany({
//       where: {
//         channelId: channelId,
//       },
//       include: {
//         user: {
//           select: {
//             id: true,
//             username: true,
//             avatar: true,
//           },
//         },
//       },
//     });

//     return h
//       .response({
//         status: 'sucess',
//         message: 'success fetching data',
//         result: {
//           participant,
//         },
//       })
//       .code(200);
//   } catch (error) {
//     console.log(error);
//     return h
//       .response({
//         status: 'error',
//         message: 'server error!',
//       })
//       .code(500);
//   }
// };

module.exports = {
  addParticipan,
  removeParticipant,
  // getParticipants,
  // getParticipantByChannel,
};
