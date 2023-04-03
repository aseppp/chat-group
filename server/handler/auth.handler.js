const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (request, h) => {
  const { username, email, password, avatar } = request.payload;

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existUser) {
      const response = h.response({
        status: 'failed',
        message: 'user already exist ',
      });
      response.code(400);
      return response;
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

    const response = h.response({
      status: 'sucess',
      message: 'sign up success',
    });
    response.code(201);
    return response;
  } catch (error) {
    console.log(error);
    const response = h.response({
      status: 'failed',
      message: 'server error!',
    });

    response(500);
    return response;
  }
};

const signIn = async (request, h) => {
  const { email, password } = request.payload;

  try {
    const existUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!existUser) {
      const response = h.response({
        status: 'failed',
        message: 'user not found ',
      });
      response.code(400);
      return response;
    }

    const compare = await bcrypt.compare(password, existUser.password);
    if (!compare) {
      return h
        .response({
          status: 'failed',
          message: 'wrong password',
        })
        .code(400);
    }

    const token = jwt.sign(existUser.id, process.env.SECRET);

    const result = { user: existUser, token: token };
    const response = h.response({
      status: 'sucess',
      message: 'sign in success',
      result: result,
    });
    response.code(201);
    return response;
  } catch (error) {
    console.log(error);
    const response = h.response({
      status: 'failed',
      message: 'server error!',
    });

    response(500);
    return response;
  }
};

module.exports = { signUp, signIn };
