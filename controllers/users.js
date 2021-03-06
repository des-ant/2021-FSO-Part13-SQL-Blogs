const router = require('express').Router()

const { User, Blog } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ['userId'] }
    }
  })
  res.json(users)

  console.log(req.sessionID)
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.json(user)
})

router.put('/:username', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username
    }
  })
  console.log(user)
  if (user) {
    user.username = req.body.username
    await user.save()
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.get('/:id', async (req, res) => {
  const queryRead = req.query.read
  let user = undefined

  if (queryRead !== undefined) {
    user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } ,
      include:[
        {
          model: Blog,
          as: 'readings',
          attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
          through: {
            where: { read: queryRead },
            attributes: ['read', 'id'],
          },
        },
      ]
    })
  } else {
    user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } ,
      include:[
        {
          model: Blog,
          as: 'readings',
          attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
          through: {
            attributes: ['read', 'id'],
          },
        },
      ]
    })
  }

  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router
