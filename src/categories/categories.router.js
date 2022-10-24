const router = require('express').Router()

const categoryServices = require('./categories.services')
const {getPostsByCategory} = require('../posts/posts.services')

// No protegida
//? /app/v1/categorys
router.route('/')
.get(categoryServices.getAllCategories)  
.post(categoryServices.postCategory)

router.get('/:id',categoryServices.getCategoryById) // Posts x Catagories

router.get('/:id/posts',getPostsByCategory)

module.exports = router