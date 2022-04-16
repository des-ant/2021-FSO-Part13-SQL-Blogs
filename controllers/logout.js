const router = require('express').Router()

const Session = require('../models/session')

router.delete('/', async (req, res) => {
  const session = await Session.findByPk(req.sessionID)

  if (session) {
    console.log(session.dataValues)
    await session.destroy()
  }

  // No content, refresh document view
  res.status(205).end()
})

module.exports = router
