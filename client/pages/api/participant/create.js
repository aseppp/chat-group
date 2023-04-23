const { default: prisma } = require('@/lib/prismadb');

export default async function handler(request, response) {
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

    response.send({
      status: 'sucess',
      message: 'success fetching data',
      result: {
        participant,
      },
    });
  } catch (error) {
    console.log(error);
    response.send({
      status: 'error',
      message: 'server error!',
    });
  }
}
