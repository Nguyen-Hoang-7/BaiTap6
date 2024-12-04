const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

let connections = 0;

app.get('/sse', (req, res) => {
  connections++;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendEvent = () => {
    const data = {
      time: new Date().toISOString(),
      connections,
    };
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  const interval = setInterval(sendEvent, 1000);

  req.on('close', () => {
    clearInterval(interval);
    connections--;
  });
});

const PORT = 4000;
app.listen(PORT, () => console.log(`SSE server running on port ${PORT}`));
