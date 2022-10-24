const router = require('express').Router()
const passport = require('passport')

const postServices = require('./posts.services')
require('../middlewares/auth.middleware')(passport) //* Para rutas protegidas

//? /app/v1/posts
router.route('/')
.get(postServices.getAllPosts) 
// const adminValidate = require('../middlewares/role.middleware')
.post(
    passport.authenticate('jwt',{session:false}),
    postServices.createPost)

// router.get('/:id',categoryServices.getCategoryById)

module.exports = router