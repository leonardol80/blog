const uuid = require('uuid')
const Categories = require('../models/categories.models')
const Posts = require('../models/post.models')
const Users = require('../models/users.models')

// const { hashPassword } = require('../utils/crypto')

const getAllPosts = async () => {
    const data = await Posts.findAll({
        attributes:{
            exclude: ['userId','cetegoryId','createdAt','updatedAt']
        },
        
        include: [
            {
                model: Users,
                as: 'user',
                attributes:['id','firstName','lastName','email']
                // attributes: {
                //     exclude: ['password','createdAt','updateAt','phone','birthday','gender']
                    
                // }
            },
            {
                model: Categories,
                as: 'category',
                attributes:{
                    exclude:'id'
                }
            }
        ],
    })
    return data
}

// Posts , Categories, PostCategories (Ejemplo)
// Posts.findAll({
//     include:[{
//         model: PostCategories,
//         include:[{
//             model: Categories
//         }]
//     }]
// })

const getPostById = async (id) => {
    const data = await Posts.findOne({
        where: {
            id: id,
        },

        attributes:{
            exclude: ['userId','cetegoryId','createdAt','updatedAt']
        },
        
        include: [
            {
                model: Users,
                as: 'user',
                attributes:['id','firstName','lastName','email']
            },
            {
                model: Categories,
                as: 'category',
                attributes:{
                    exclude:'id'
                }
            }
        ],

    })
    return data
}

const createPost = async (data) => {
    const newPost = await Posts.create({
        id: uuid.v4(),
        title: data.title,
        content: data.content,
        userId: data.createdBy,
        categoryId: data.categoryId
    })
    return newPost
}

const getPostsByCategory = async(categoryId) =>{
    const data = await Posts.findAll({
        where:{
            categoryId:categoryId
        },
    })
    return data
}

module.exports ={
    getAllPosts,
    getPostById,
    createPost,
    getPostsByCategory
}