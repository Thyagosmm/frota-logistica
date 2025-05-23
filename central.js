const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('logistics.proto');
const { logistics } = grpc.loadPackageDefinition(packageDefinition);

const vehicles = new Map();

const trackVehicle = (call) => {
  const vehicleId = Date.now().toString();
  
  call.on('data', (status) => {
    vehicles.set(vehicleId, status);
    console.log(`Update from ${vehicleId}:`, status);
    
    // Lógica de comando de exemplo
    if (status.speed > 150) {
      call.write({
        command: "speed - " + status.speed,
        message: "REDUZA IMEDIATAMENTE!"
      });
    }
    else if (status.speed >= 100 &&  status.speed <= 150) {
      call.write({
        command: "speed - " + status.speed,
        message: "REDUZA A VELOCIDADE!"
      });
    }
    else if (status.speed >=60 &&  status.speed <= 100) {
      call.write({
        command: "speed - " + status.speed,
        message: "MANTENHA A VELOCIDADE!"
      });
    }
    else{
      call.write({
        command: "speed - " + status.speed,
        message: "AUMENTE A VELOCIDADE"
      });
    }
  });

  call.on('end', () => {
    vehicles.delete(vehicleId);
    call.end();
  });
};

const server = new grpc.Server();
server.addService(logistics.CentralTrackingService.service, { trackVehicle });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('Central rodando na porta 50051');
});