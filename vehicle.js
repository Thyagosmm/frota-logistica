const express = require('express');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const app = express();

const packageDefinition = protoLoader.loadSync('logistics.proto');
const { logistics } = grpc.loadPackageDefinition(packageDefinition);
const client = new logistics.CentralTrackingService(
  'localhost:50051', 
  grpc.credentials.createInsecure()
);

app.use(express.static('public'));
const call = client.trackVehicle();

// WebSocket para comunicação em tempo real
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

call.on('data', (command) => {
  wss.clients.forEach(client => {
    client.send(JSON.stringify(command));
  });
});

app.post('/position', express.json(), (req, res) => {
  const { x, y, speed } = req.body;
  const status = {
    vehicle_id: 'veiculo-1',
    x,
    y,
    status: 'movendo',
    speed: speed
  };
  call.write(status);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Veículo rodando na porta 3000'));