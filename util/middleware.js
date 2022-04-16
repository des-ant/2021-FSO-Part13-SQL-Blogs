const jwt = require('jsonwebtoken')

const { SECRET } = require('../util/config')

const Session = require('../models/session')

const errorHandler = (error, request, response, next) => {
  console.log(error.name)
  console.error(error.message)

  if (error.name === 'SequelizeDatabaseError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'SequelizeValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'ReferenceError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
  const session = await Session.findByPk(req.sessionID)

  if (session === null) {
    return res.status(401).json({ error: 'session invalid, please login' })
  }

  const authorization = `bearer ${session.token}`

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch{
      res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    res.status(401).json({ error: 'token missing' })
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor,
}
