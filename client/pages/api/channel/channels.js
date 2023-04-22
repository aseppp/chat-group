import prisma from '@/lib/prismadb';

export default async function handler(request, response) {
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
    // console.log(error);
    return response
      .send({
        status: 'error',
        message: 'server error!',
      })
      .status(500);
  }
}
