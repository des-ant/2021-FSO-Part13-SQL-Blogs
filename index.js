const express = require('express')
const app = express()
require('express-async-errors')
const session = require('express-session')

const { PORT, SESSION_SECRET } = require('./util/config')
const { connectToDatabase } = require('./util/db')
const middleware = require('./util/middleware')

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readingListsRouter = require('./controllers/readingLists')
const logoutRouter = require('./controllers/logout')

app.use(express.json())

const sessionConfig = {
  name: 'session',
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
};

app.use(session(sessionConfig))

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readingListsRouter)
app.use('/api/logout', logoutRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

app.use(middleware.errorHandler);
