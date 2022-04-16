const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')
const Session = require('../models/session')

router.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(
    userForToken,
    SECRET,
    { expiresIn: 60*60 }
  )

  // Check if session already exists before adding token
  const existingSession = await Session.findByPk(req.sessionID)
  if (existingSession !== null) {
    return res.status(401).json({ error: 'already logged in' })
  }

  const newSession = await Session.create({
    sid: req.sessionID,
    token
  })

  console.log(newSession.dataValues)

  res
    .status(200)
    .send({ username: user.username, name: user.name })
})

module.exports = router
