const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('logistics.proto');
const { logistics } = grpc.loadPackageDefinition(packageDefinition);

const estimateDelivery = (call, callback) => {
  const { destination } = call.request;
  const estimate = Math.floor(Math.random() * 60 + 30);
  callback(null, { estimate: `Estimativa para ${destination}: ${estimate} minutos` });
};

const server = new grpc.Server();
server.addService(logistics.DeliveryEstimateService.service, { estimateDelivery });
server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('Estimativa rodando na porta 50052');
});