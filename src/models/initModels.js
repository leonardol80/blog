//? Se importan todos los modelos
const Users = require('./users.models')
const Post = require('./post.models')
const Categories = require('./categories.models')

const initModels = () => {
    // Relaciones
    // Relacion 1 -> *
    //? Los post pertenece a 1 usuario
    //? 1 usuario tiene muchos post
    Post.belongsTo(Users)
    Users.hasMany(Post)

    Post.belongsTo(Categories)
    Categories.hasMany(Post)
}

module.exports = initModels