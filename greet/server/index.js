const grpc = require('@grpc/grpc-js');
const cp = require('child_process')

const addr = 'localhost:50051';

let cont = 0;

async function cleanup(server) {
    if (cont >= 1) process.exit(0)
    cont++;
    console.log('Cleaning up Server...', cont);
    if (server) await server.forceShutdown();

}

function main() {
    const server = new grpc.Server();
    const creds = grpc.ServerCredentials.createInsecure();

    process.on('SIGINT', () => {
        if (cont < 1) {
            console.log('Caught interrupt signal');
            cleanup(server);
        }
    })

    server.bindAsync(addr, creds, (err, _) => {
        if (err) return cleanup(server);

        server.start();
    });

    console.log(`gRPC Server listening on: ${addr}`)
}

main();