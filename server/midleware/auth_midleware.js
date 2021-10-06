const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    req.user = jwt.verify(token, config.get("jwtSecret"))

    next()

  } catch (e) {
    res.status(402).json({ message: 'Нет авторизации' })

  }
}
