import prisma from '@/lib/prismadb';
import { Server } from 'socket.io';

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server, {
      cors: ['https://chat-group-me.vercel.app/'],
      method: ['POST', 'GET'],
    });

    io.on('connection', (socket) => {
      console.log('connected to client: ', socket.id);

      // LOAD MESSAGE
      socket.on('load message', async (payload) => {
        const channelId = payload;

        try {
          const data = await prisma.message.findMany({
            where: {
              channelId: channelId,
            },
            include: {
              author: true,
            },
          });

          socket.broadcast.emit('messages', data);
        } catch (error) {
          console.log(error);
        }
      });

      socket.on('disconnect', () => {
        console.log('client disconnect');
      });
    });

    res.socket.server.io = io;
  } else {
    console.log('socket.io already running');
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;

// import { Server } from 'socket.io';

// export default function SocketHandler(req, res) {
//   if (res.socket.server.io) {
//     console.log('Already set up');
//     res.end();
//     return;
//   }

//   const io = new Server(res.socket.server, {
//     cors: 'http://localhost:3000/',
//   });

//   res.socket.server.io = io;

//   io.on('connection', (socket) => {
//     console.log('connected to client: ', socket.id);

//     // socket.on('send-message', (obj) => {
//     //   io.emit('receive-message', obj);
//     // });

//     //  LOAD MESSAGE
//     socket.on('load message', async (payload) => {
//       const channelId = payload;

//       try {
//         const data = await prisma.message.findMany({
//           where: {
//             channelId: channelId,
//           },
//           include: {
//             author: true,
//           },
//         });

//         socket.broadcast.emit('messages', data);
//       } catch (error) {
//         console.log(error);
//       }
//     });

//     socket.on('disconnect', () => {
//       console.log('client disconnect');
//     });
//   });

//   console.log('Setting up socket');
//   res.end();
// }
