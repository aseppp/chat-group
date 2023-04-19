const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const io = require('socket.io')(4000, {
  cors: {
    origin: ['http://localhost:3000'],
  },
});

io.on('connection', (socket) => {
  console.log(socket.id);
});

app.get('/', (req, res) => {
  res.json('Server working propperly');
});

const routes = require('./routes/routes');
const { log } = require('console');
app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server berjalan pada ${PORT}`);
});
