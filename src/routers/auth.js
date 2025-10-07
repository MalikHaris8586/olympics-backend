const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

// signup
router.post('/signup', express.json(), async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).send({ success: false, error: 'name, email, password are required' })
        }
        const existing = await User.findOne({ email })
        if (existing) {
            return res.status(409).send({ success: false, error: 'Email already registered' })
        }
        const hashed = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashed })
        const token = jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, { expiresIn: '59m' })
        res.status(201).send({ success: true, message: 'Signup successful', token, userId: user._id, user: { id: user._id, name: user.name, email: user.email } })
    } catch (e) {
        res.status(400).send({ success: false, error: e && e.message ? e.message : e })
    }
})

// login
router.post('/login', express.json(), async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ success: false, error: 'email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(401).send({ success: false, error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ success: false, error: 'Invalid credentials' });
        }

        const token = jwt.sign({ sub: user._id, email: user.email }, JWT_SECRET, { expiresIn: '59m' })
        res.send({ success: true, message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (e) {
        res.status(400).send({ success: false, error: e && e.message ? e.message : e })
    }
})

module.exports = router


