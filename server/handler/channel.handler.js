const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createChannel = async (req, res) => {
  const { title, description } = req.body;

  try {
    const existChannel = await prisma.channel.findFirst({
      where: {
        title: title,
      },
    });

    if (existChannel) {
      res.status(400).send({
        status: 'failed',
        message: 'channel name already exist',
      });
    }

    const newChannel = await prisma.channel.create({
      data: {
        title: title,
        description: description,
      },
    });

    res.status(201).send({
      status: 'sucess',
      message: 'channel created',
      result: {
        newChannel,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'error',
      message: 'server error!',
    });
  }
};

const getChannels = async (request, response) => {
  try {
    const channels = await prisma.channel.findMany({
      include: {
        users: {
          select: {
            user: true,
            channel: true,
          },
        },
      },
    });

    response
      .send({
        status: 'sucess',
        message: 'success fetching data',
        result: {
          channels,
        },
      })
      .status(200);
  } catch (error) {
    console.log(error);
    return response
      .send({
        status: 'error',
        message: 'server error!',
      })
      .status(500);
  }
};

const getChannel = async (request, response) => {
  const { id } = request.params;

  try {
    const channel = await prisma.channel.findUnique({
      where: {
        id: id,
      },
      include: {
        messages: {
          select: {
            author: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
            text: true,
          },
        },
        users: {
          select: {
            user: true,
            userId: true,
          },
        },
      },
    });

    response.status(200).send({
      status: 'sucess',
      message: 'success fetching data',
      result: {
        channel,
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

const deleteChannel = async (request, response) => {
  const { id } = request.params;

  try {
    const channel = await prisma.channel.delete({
      where: {
        id: id,
      },
    });
    return response
      .send({
        status: 'sucess',
        message: 'success delete data',
        result: {
          channel,
        },
      })
      .code(200);
  } catch (error) {
    console.log(error);
    return response
      .send({
        status: 'error',
        message: 'server error!',
      })
      .code(500);
  }
};

const updateChannel = async (request, response) => {
  const { id } = request.params;
  const { title, description } = request.body;

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

    return response
      .send({
        status: 'sucess',
        message: 'success update data',
        result: {
          channel,
        },
      })
      .code(201);
  } catch (error) {
    console.log(error);
    return response
      .send({
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
