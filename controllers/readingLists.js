const router = require('express').Router()

const { ReadingLists } = require('../models')

router.post('/', async (req, res) => {
  const readings = await ReadingLists.create(req.body)
  res.json(readings)
})

module.exports = router
