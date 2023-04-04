const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sendMessage = async (request, h) => {
  const { text, authorId, channelId } = request.payload;

  try {
    const message = await prisma.message.create({
      data: {
        text: text,
        authorId: authorId,
        channelId: channelId,
      },
    });

    return h
      .response({
        status: 'sucess',
        message: 'message send',
        result: {
          message,
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

const deleteMessage = async (request, h) => {
  const { id } = request.params;

  try {
    const message = await prisma.message.delete({
      where: {
        id: id,
      },
    });

    return h
      .response({
        status: 'sucess',
        message: 'message deleted',
        result: {
          message,
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

module.exports = { sendMessage, deleteMessage };
