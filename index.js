const express = require('express')
const app = express()
require('express-async-errors')
const session = require('express-session')

// initalize sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const { PORT, SESSION_SECRET } = require('./util/config')
const { connectToDatabase, sequelize } = require('./util/db')
const middleware = require('./util/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readingLists')

app.use(express.json())

const sessionStore = new SequelizeStore({
  db: sequelize,
  checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
})

const sessionConfig = {
  name: 'session',
  secret: SESSION_SECRET,
  store: sessionStore,
  resave: false, // we support the touch method so per the express-session docs this should be set to false
  proxy: true, // if you do SSL outside of node.
  saveUninitialized: true,
};

app.use(session(sessionConfig))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

app.use(middleware.errorHandler);
