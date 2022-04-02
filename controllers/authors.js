const router = require('express').Router()
const { Op, fn, col } = require('sequelize')

const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [fn('COUNT', col('id')), 'articles'],
      [fn('SUM', col('likes')), 'likes']
    ],
    group: 'author',
    order: [
      [col('likes'), 'DESC']
    ]
  })
  console.log(JSON.stringify(blogs, null, 2))
  res.json(blogs)
})

module.exports = router
