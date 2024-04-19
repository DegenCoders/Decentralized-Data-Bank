import { Router } from "express";
import { getTracker, startTracker, stopTracker, getTrackerAddress } from "../utils/index.js";

const trackerRouter = Router()

trackerRouter.get("/tracker", function (req, res, next) {
    res.send(getTracker("localhost"))
})

trackerRouter.get("/tracker/address", function (req, res, next) {
    res.send(getTrackerAddress())
})

trackerRouter.get("/tracker/create", function (req, res, next) {
    res.send(startTracker())
})

trackerRouter.get("/tracker/delete", function (req, res, next) {
    res.send(stopTracker())
})

export default trackerRouter