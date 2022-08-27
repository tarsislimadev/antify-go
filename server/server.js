
const servers = require('./servers')
const api = require('./app')
const { logInfo } = require('./libs/log')

const {
  ws_port,
  https_port,
  http_port,
  ftps_port,
  ftp_port,
  net_port,
} = require('./config')

// HTTP
if (http_port)
  servers.http(api).listen(http_port, () => logInfo('Listening "http" on ' + http_port))
else
  console.log('Not http port')

// HTTPS
if (https_port)
  servers.https(api).listen(https_port, () => logInfo('Listening "https" on ' + https_port))

// FTP
if (ftp_port)
  servers.ftp(api).listen(ftp_port, () => logInfo('Listening "ftp" on ' + ftp_port))

// FTPS
if (ftps_port)
  servers.ftps(api).listen(ftps_port, () => logInfo('Listening "ftps" on ' + ftps_port))

// WEBSOCKET
if (ws_port)
  servers.ws(api).listen(ws_port, () => logInfo('Listening "ws" on ' + ws_port))

// TELNET
if (net_port)
  servers.net(api).listen(net_port, () => logInfo('Listening "net" on ' + net_port))
