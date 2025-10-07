const express = require("express");
const cors = require("cors")
require("../src/db/conn")

const mensRouter = require("./routers/mens")
const authRouter = require("./routers/auth")
const eventsRouter = require("./routers/events")
const medalStandingsRouter = require("./routers/medalStandings")
const disciplinesRouter = require("./routers/disciplines")
const countryDataRouter = require("./routers/countryDataRouter")
const athleteRouter = require("./routers/athlete")
const dashboardRouter = require("./routers/dashboardRouter")
const eventRouter = require("./routers/eventRouter")

const app = express();

const port = process.env.PORT || 3000
// accept JSON bodies
app.use(express.json())
// enable CORS for frontend origin
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
// handle invalid JSON in request body (applies to routes that use express.json())
app.use((err, req, res, next) => {
    
    if (err && err.type === 'entity.parse.failed') {
        return res.status(400).send({ success: false, error: 'Invalid JSON in request body' })
    }
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ success: false, error: 'Invalid JSON in request body' })
    }
    next(err)
})
// mount routers
app.use("/mens", mensRouter)
app.use("/auth", authRouter)
app.use("/api/external-events", eventsRouter)
app.use("/api", medalStandingsRouter)
app.use("/api", disciplinesRouter)
app.use("/api", countryDataRouter)
app.use("/api", athleteRouter)
app.use("/api", dashboardRouter)
app.use("/api", eventRouter)


app.get("/", async (req, res) => {
    res.send("hy hello")
})

app.listen(port, () => {
    console.log(`connection is live at port no. ${port}`)
})