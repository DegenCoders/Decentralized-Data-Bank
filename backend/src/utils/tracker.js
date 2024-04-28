import { Server } from 'bittorrent-tracker'

let trackerServer = startTracker(); // Store server instance for reference
export function startTracker(trackerHost) {
  const server = new Server({
    udp: true,
    http: true,
    ws: true,
    stats: true,
    trustProxy: true,
  })
  server.http
  server.udp
  server.ws

  server.on('error', function (err) {
    console.log(err.message)
  })

  server.on('warning', function (err) {
    console.log(err.message)
  })

  server.on('listening', function () {
    const httpAddr = server.http.address()
    const httpHost = httpAddr.address !== '::' ? httpAddr.address : 'localhost'
    const httpPort = httpAddr.port
    console.log(`HTTP tracker: http://${httpHost}:${httpPort}/announce`)
    console.log(`Stats tracker: http://${httpHost}:${httpPort}/stats`)

    const udpAddr = server.udp.address()
    const udpHost = udpAddr.address
    const udpPort = udpAddr.port
    console.log(`UDP tracker: udp://${udpHost}:${udpPort}`)
  
    const wsAddr = server.ws.address()
    const wsHost = wsAddr.address !== '::' ? wsAddr.address : 'localhost'
    const wsPort = wsAddr.port
    console.log(`WebSocket tracker: ws://${wsHost}:${wsPort}`)

    trackerServer = server; // Store server instance for later reference
    console.log("STORED TO GLOBAL")
  })
  const port = 40267
  const hostname = trackerHost
  server.listen(port, hostname, () => {
  })
  return server
}

export function getTracker() {
  return trackerServer;
}

export function getTrackerAddress() {
  if (!trackerServer) {
    throw new Error('Tracker server not started'); // Or provide a default address
  }

  const httpAddr = trackerServer.http.address()
  const httpHost = httpAddr.address !== '::' ? httpAddr.address : 'localhost'
  const httpPort = httpAddr.port

  const wsAddr = trackerServer.ws.address()
  const wsHost = wsAddr.address !== '::' ? wsAddr.address : 'localhost'
  const wsPort = wsAddr.port

  return [`http://${httpHost}:${httpPort}/announce`, `ws://${wsHost}:${wsPort}`]
}

export function stopTracker() {
  if (trackerServer) {
    try {
      trackerServer.close();
      console.log('BitTorrent tracker server stopped successfully.');
    } catch (err) {
      console.error('Error stopping BitTorrent tracker server:', err.message);
    } finally {
      trackerServer = null; // Clear server reference
    }
  } else {
    console.warn('BitTorrent tracker server not running. No need to stop.');
  }
}