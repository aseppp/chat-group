const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (request, response) => {
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
};

const signIn = async (request, response) => {
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
};

module.exports = { signUp, signIn };
