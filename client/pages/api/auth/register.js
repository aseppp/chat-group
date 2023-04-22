import prisma from '@/lib/prismadb';
import bcrypt from 'bcrypt';

export default async function handler(request, response) {
  const { username, email, password, avatar } = request.body;

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existUser) {
      response.status(400).send({
        status: 'failed',
        message: 'user already exist ',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hasheadPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hasheadPassword,
        avatar: avatar,
      },
    });

    response.status(200).send({
      status: 'sucess',
      message: 'sign up success',
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: 'failed',
      message: 'server error!',
    });
  }
}
