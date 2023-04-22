const { default: prisma } = require('@/lib/prismadb');

export default async function handler(request, response) {
  const { id } = request.query;

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
}
