import createTorrent from "create-torrent";
import fs from 'fs'
import WebTorrent from 'webtorrent';
import { getTrackerAddress } from "./tracker.js";
let announcer = getTrackerAddress()
const client = new WebTorrent();

export function createTorrentfromFile(filePath) {
    const clientOpts = {
        announce: [announcer],
    }
    client.seed("./target", clientOpts, (torrent) => {
        console.log('Magnet Torrent:', torrent.magnetURI);
        console.log('Added torrent:', torrent.name);
        console.log("Torrent progress:", torrent.progress)
        console.log('Torrent Path:', torrent.path); 
        console.log("Torrent Readiness:", torrent.ready)
    });
}
