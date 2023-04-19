const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const sendMessage = async (request, response) => {
  const { text, authorId, channelId } = request.body;

  try {
    const message = await prisma.message.create({
      data: {
        text: text,
        authorId: authorId,
        channelId: channelId,
      },
    });

    response.status(201).send({
      status: 'sucess',
      message: 'message send',
      result: {
        message,
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

const deleteMessage = async (request, response) => {
  const { id } = request.params;

  try {
    const message = await prisma.message.delete({
      where: {
        id: id,
      },
    });

    response.status(200).send({
      status: 'sucess',
      message: 'message deleted',
      result: {
        message,
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

module.exports = { sendMessage, deleteMessage };
