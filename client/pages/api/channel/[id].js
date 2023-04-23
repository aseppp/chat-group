import prisma from '@/lib/prismadb';

export default async function handler(req, res) {
  const { id } = req.query;

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

    res.send({
      status: 'sucess',
      message: 'success fetching data',
      result: {
        channel,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'error',
      message: 'server error!',
    });
  }
}
