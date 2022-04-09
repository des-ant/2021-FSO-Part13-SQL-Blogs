const Blog = require('./blog')
const User = require('./user')
const ReadingLists = require('./reading_lists')

Blog.belongsTo(User)
User.hasMany(Blog)

User.belongsToMany(Blog, { through: ReadingLists, as: 'readings' })
Blog.belongsToMany(User, { through: ReadingLists, as: 'readers' })

module.exports = {
  Blog, User, ReadingLists
}
