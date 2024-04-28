import { Router } from "express";
import { createTorrentfromFile, getTrackerAddress } from "../utils/index.js";

const torrentRouter = Router()

torrentRouter.get("/torrent/list", function (req, res, next) {
    // res.send(getTracker())
})

torrentRouter.get("/torrent/:id}", function (req, res, next) {
    // res.send(getTracker())
})

torrentRouter.get("/torrent/create", function (req, res, next) {
    createTorrentfromFile("target/calamares.gz")
    res.send("OK")
})

torrentRouter.get("/torrent/delete", function (req, res, next) {
    // res.send(stopTracker())
})

export default torrentRouter