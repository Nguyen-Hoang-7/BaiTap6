const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });

let connections = 0;

wss.on('connection', (ws) => {
  connections++;

  const sendUpdate = () => {
    const data = {
      time: new Date().toISOString(),
      connections,
    };
    ws.send(JSON.stringify(data));
  };

  const interval = setInterval(sendUpdate, 1000);

  ws.on('close', () => {
    clearInterval(interval);
    connections--;
  });
});

console.log('WebSocket server running on port 4000');
