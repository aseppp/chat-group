const { default: prisma } = require('@/lib/prismadb');

export default async function handler(req, res) {
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
}
