import createTorrent from "create-torrent";
import fs from 'fs'
import WebTorrent from 'webtorrent';
import { getTrackerAddress } from "./tracker.js";
let announcer = getTrackerAddress()
const client = new WebTorrent({tracker:announcer});

console.log("announcer "+announcer)
export function createTorrentfromFile(filePath, filename, requester) {
    console.log("announcer "+announcer)
    const opts = {
        name: filename,
        createdBy: requester,
        private: true,
        announceList: [[announcer]]
    }
    console.log(opts)
    createTorrent(filePath, opts, (err, torrent) => {
        if (!err) {
            fs.writeFile(filename + ".torrent", torrent, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully");
                }
            })
            client.seed(torrent, opts, (torrent) => {
                console.log('Seeding torrent:', torrent.name);
            });
        }
        else {
            console.log(err)
        }
    })
}
