import { Server } from 'bittorrent-tracker'

let trackerServer = startTracker(); // Store server instance for reference
export function startTracker(trackerHost) {
  const server = new Server({
    udp: false,
    http: true,
    ws: false,
    stats: true,
    trustProxy: false,
  })
  server.http

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

    trackerServer = server; // Store server instance for later reference
    console.log("STORED TO GLOBAL")
  })
  const port = 0
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
  return `http://${httpHost}:${httpPort}/announce`
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