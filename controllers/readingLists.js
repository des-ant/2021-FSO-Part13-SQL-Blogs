const router = require('express').Router()

const { ReadingLists } = require('../models')
// const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const readings = await ReadingLists.create(req.body)
  res.json(readings)
})

// router.get('/:id', tokenExtractor, async (req, res) => {
//   const userId = req.decodedToken.id
//   const blogId = req.params.id
//   const isRead = req.body.isRead
//   const readings = await ReadingLists.create({ ...req.body, userId: user.id })
//   res.json(blog)
// })

module.exports = router
