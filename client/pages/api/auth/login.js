import prisma from '@/lib/prismadb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(request, response) {
  const { email, password } = request.body;

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existUser) {
      response.status(400).send({
        status: 'failed',
        message: 'user not found ',
      });
    }

    const compare = await bcrypt.compare(password, existUser.password);
    if (!compare) {
      response.status(400).send({
        status: 'failed',
        message: 'wrong password',
      });
    }

    const token = jwt.sign(existUser.id, process.env.SECRET);

    const result = { user: existUser, token: token };
    response.status(200).send({
      status: 'sucess',
      message: 'sign in success',
      result: result,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      status: 'failed',
      message: 'server error!',
    });
  }
}
