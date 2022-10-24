const Categories = require('../models/categories.models')

// const UseCategoriesrs = require('../models/categories.models')
// const { hashPassword } = require('../utils/crypto')

const getAllCategories = async () => {
    const data = await Categories.findAll()
    return data
}

const getCategoryById = async (id) => {
    const data = await Categories.findOne({
        where: {
            id: id,
        }
    })
    return data
}

const createCategory = async (data) => {
    const newCategory = await Categories.create({
        name: data.name,
    })
    return newCategory
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory
}