const router = require('express').Router()

const { ReadingLists } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const readings = await ReadingLists.create(req.body)
  res.json(readings)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const reading = await ReadingLists.findOne({
    where: {
      userId: req.decodedToken.id,
      blogId: req.params.id
    }
  })
  console.log(reading)
  if (reading) {
    reading.read = req.body.read
    await reading.save()
    res.json(reading)
  } else {
    res.status(404).end()
  }
})

module.exports = router
