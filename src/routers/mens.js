const express = require('express')
const MenRanking = require('../models/mens')
const auth = require('../middleware/auth')

const router = express.Router()

// create a new record
router.post('/post', auth, express.json(), async (req, res) => {
    try {
        const men = new MenRanking({ ...req.body, user: req.user.id })
        const saved = await men.save()
        res.status(200).send({ success: true, message: 'Record created successfully', data: saved })
    } catch (e) {
        res.status(400).send({ success: false, error: e && e.message ? e.message : e })
    }
})

// list all records
router.get('/get-all', auth, async (req, res) => {
    try {
        const records = await MenRanking.find({ user: req.user.id })
        res.send(records)
    } catch (e) {
        res.status(500).send({ error: e && e.message ? e.message : e })
    }
})

// dashboard summary for 4 cards
router.get('/summary', auth, async (req, res) => {
    try {
        const userId = req.user.id

        const [total, countriesAgg, best, latest] = await Promise.all([
            MenRanking.countDocuments({ user: userId }),
            MenRanking.aggregate([
                { $match: { user: new (require('mongoose').Types.ObjectId)(userId) } },
                { $group: { _id: '$country' } },
                { $count: 'uniqueCountries' }
            ]),
            MenRanking.findOne({ user: userId }).sort({ ranking: 1 }).select({ _id: 0, ranking: 1, name: 1, country: 1 }),
            MenRanking.findOne({ user: userId }).sort({ _id: -1 }).select({ _id: 1, name: 1, country: 1, ranking: 1 })
        ])

        const uniqueCountries = countriesAgg && countriesAgg[0] ? countriesAgg[0].uniqueCountries : 0

        res.send({
            success: true,
            data: {
                totalRecords: total,
                uniqueCountries,
                bestRanking: best ? best.ranking : null,
                latestRecord: latest || null
            }
        })
    } catch (e) {
        res.status(500).send({ success: false, error: e && e.message ? e.message : e })
    }
})

// update a record by id (partial update)
router.patch('/:id', auth, express.json(), async (req, res) => {
    try {
        const { id } = req.params
        const updated = await MenRanking.findOneAndUpdate({ _id: id, user: req.user.id }, req.body, {
            new: true,
            runValidators: true
        })
        if (!updated) {
            return res.status(404).send({ success: false, error: 'Record not found' })
        }
        res.send({ success: true, message: 'Record updated successfully', data: updated })
    } catch (e) {
        res.status(400).send({ success: false, error: e && e.message ? e.message : e })
    }
})

// delete a record by id
router.delete('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await MenRanking.findOneAndDelete({ _id: id, user: req.user.id })
        if (!deleted) {
            return res.status(404).send({ success: false, error: 'Record not found' })
        }
        res.send({ success: true, message: 'Record deleted successfully', data: deleted })
    } catch (e) {
        res.status(400).send({ success: false, error: e && e.message ? e.message : e })
    }
})

module.exports = router


