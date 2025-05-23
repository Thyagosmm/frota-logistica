# Sistema de Gestão de Frota com gRPC

Sistema distribuído para monitoramento de veículos em tempo real usando comunicação bidirecional via gRPC.

## 🚀 Funcionalidades Principais
- **Rastreamento em Tempo Real:** Atualizações de posição via movimentos do mouse
- **Controle de Velocidade Inteligente:** Lógica de comandos baseada em padrões de movimento
- **Estimativa de Entrega:** Simulação de cálculos de ETA (Tempo Estimado de Chegada)
- **Interface Visual:** Representação gráfica do veículo e comandos

## 🛠 Tecnologias Utilizadas
- **Backend:** Node.js v18+
- **Comunicação:** gRPC com streaming bidirecional
- **Frontend:** HTML5 Canvas + WebSocket
- **Protocolos:** Protobuf 3
- **Dependências:** 
  - `@grpc/grpc-js`
  - `express`
  - `ws`

## 📦 Instalação

# Clone o repositório
git clone https://github.com/Thyagosmm/frota-logistica.git
# Instale as dependências
npm install
# Gere os stubs gRPC (Linux/WSL)
npx grpc_tools_node_protoc --js_out=import_style=commonjs,binary:. --grpc_out=grpc_js:. logistics.proto

## Execução

# Inicie os serviços em terminais separados
node central.js      # Serviço Central (Porta 50051)
node estimate.js    # Serviço de Estimativas (Porta 50052)
node vehicle.js     # Serviço de Veículo + Frontend (Porta 3000)

# Acesse a interface em:
http://localhost:3000