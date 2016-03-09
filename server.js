const clientPort = 8080;
const backendPort = 8081;

const clientServer = require(__dirname + '/lib/client_server');
clientServer(clientPort);

const backendServer = require(__dirname + '/lib/backend_server');
backendServer(backendPort);
