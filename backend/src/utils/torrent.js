import createTorrent from "create-torrent";
import fs from 'fs'
import WebTorrent from 'webtorrent';
import { getTrackerAddress } from "./tracker.js";
let announcer = getTrackerAddress()
const client = new WebTorrent({tracker:announcer});

export function createTorrentfromFile(filePath, filename) {
    const torrentOpts = {
        private: true,
        announceList: [[announcer]]
    }
    const clientOpts = {
        private: true,
        announceList: [[announcer]],
        path: "target/"
    }
    createTorrent(filePath, torrentOpts, (err, torrent) => {
        if (!err) {
            fs.writeFile(filename + ".torrent", torrent, (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("File written successfully");
                    client.add(filename+".torrent", clientOpts, (torrent) => {
                        console.log('Seeding torrent:', torrent.name);
                    });
                    console.log("seeding")
                }
            })
        }
        else {
            console.log(err)
        }
    })
}
