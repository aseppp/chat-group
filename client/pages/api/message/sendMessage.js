import prisma from '@/lib/prismadb';

export default async function handler(request, response) {
  const { text, authorId, channelId } = request.body;

  try {
    const message = await prisma.message.create({
      data: {
        text: text,
        author: { connect: { id: authorId } },
        channel: { connect: { id: channelId } },
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
}
