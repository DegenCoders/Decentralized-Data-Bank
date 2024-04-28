import WebTorrent from 'webtorrent';
import { getTrackerAddress } from "./tracker.js";
const client = new WebTorrent();
const clientOpts = {
    announce: getTrackerAddress(),
    path: "./downloaded_files"
}

export function createTorrentfromFile(filePath) {
    const torrent = client.seed("./target", clientOpts)
    console.log('Magnet Torrent:', torrent.magnetURI);
    console.log('Added torrent:', torrent.name);
    console.log("Torrent progress:", torrent.progress)
    console.log('Torrent Path:', torrent.path); 
    console.log("Torrent Readiness:", torrent.ready)
}

export function downloadFromTorrent(magnetUri) {
    console.log(magnetUri)
    const torrent = client.add(magnetUri, clientOpts)
    console.log("Downloading:", torrent.name);

    // Listen for download progress
    torrent.on('download', function (bytes)  {
        console.log('Just downloaded:', bytes);
        console.log('Total downloaded:', torrent.downloaded);
        console.log('Download speed:', torrent.downloadSpeed);
    });
    // Listen for completion
    torrent.on('done', () => {
        console.log('Download complete');
        // Do something when download is complete
    });

    // Listen for errors
    torrent.on('error', (err) => {
        console.log('Error downloading:', err);
        // Handle error
    });
}
 