const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

module.exports = function auth(req, res, next) {
    try {
        const header = req.headers['authorization'] || ''
        const parts = header.split(' ')
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).send({ success: false, error: 'Missing or invalid Authorization header' })
        }
        const token = parts[1]
        const payload = jwt.verify(token, JWT_SECRET)
        req.user = { id: payload.sub, email: payload.email }
        next()
    } catch (e) {
        return res.status(401).send({ success: false, error: 'Invalid or expired token' })
    }
}


