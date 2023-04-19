const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: ['http://localhost:3000'] });

require('./handler/socket')(io);

app.get('/', (req, res) => {
  res.json('Server working propperly');
});

const routes = require('./routes/routes');
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server berjalan pada ${PORT}`);
});
