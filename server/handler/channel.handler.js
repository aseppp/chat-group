const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createChannel = async (request, h) => {
  const { title, description } = request.payload;

  try {
    const existChannel = await prisma.channel.findFirst({
      where: {
        title: title,
      },
    });

    if (existChannel) {
      return h
        .response({
          status: 'failed',
          message: 'channel name already exist',
        })
        .code(400);
    }

    const newChannel = await prisma.channel.create({
      data: {
        title: title,
        description: description,
      },
    });

    return h
      .response({
        status: 'sucess',
        message: 'channel created',
        result: {
          newChannel,
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

const getChannels = async (request, h) => {
  try {
    const channels = await prisma.channel.findMany();

    return h
      .response({
        status: 'sucess',
        message: 'success fetching data',
        result: {
          channels,
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

const getChannel = async (request, h) => {
  const { id } = request.params;

  try {
    const channel = await prisma.channel.findUnique({
      where: {
        id: id,
      },
    });

    return h
      .response({
        status: 'sucess',
        message: 'success fetching data',
        rsult: {
          channel,
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

const deleteChannel = async (request, h) => {
  const { id } = request.params;

  try {
    const channel = await prisma.channel.delete({
      where: {
        id: id,
      },
    });
    return h
      .response({
        status: 'sucess',
        message: 'success delete data',
        rsult: {
          channel,
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

const updateChannel = async (request, h) => {
  const { id } = request.params;
  const { title, description } = request.payload;

  try {
    const channel = await prisma.channel.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        description: description,
      },
    });

    return h
      .response({
        status: 'sucess',
        message: 'success update data',
        rsult: {
          channel,
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

module.exports = {
  createChannel,
  getChannels,
  getChannel,
  deleteChannel,
  updateChannel,
};
