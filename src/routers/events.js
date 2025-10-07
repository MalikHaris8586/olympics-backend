const express = require("express")
const router = express.Router()
const { fetchEvents } = require("../services/eventsService")

router.get("/events", async (req, res) => {
    try {
        const page = req.query.page || 1
        const data = await fetchEvents(page)
        res.send({ success: true, data })
    } catch (error) {
        const status = error && error.status ? error.status : 500
        res.status(status).send({ success: false, error: error.message || "Unknown error" })
    }
})

module.exports = router


