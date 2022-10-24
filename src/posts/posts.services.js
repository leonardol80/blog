const { json } = require("sequelize");
const postControllers = require("./posts.controllers");



const getAllPosts = (req, res) => {
    postControllers
      .getAllPosts()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  };



const createPost = (req, res) => {
    const userId=req.user.id  //? Sale del token no del req.body
    const {title, content, categoryId} = req.body;
  
      if (
        title &&
        content &&
        categoryId 
      ) {
          //? Ejecutamos el controller
          postControllers.createPost({
            title, content, createdBy:userId, categoryId
          })
              .then( data => {
                  res.status(201).json(data)
              })
              .catch(err => {
                  res.status(400).json(err.message)
              })
      } else {
      //? Error cuando no mandan todos los datos necesarios para crear un usuario
          res.status(400).json({message: 'Err, all fields must be completed', 
              fields: {
              title: 'string',
              content: 'string',
              categoryId: 'uuid'
          }})
      }
  };

  const getPostsByCategory = (req,res)=>{
    const catagoryId = req.params.id
    postControllers.getPostsByCategory(catagoryId)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      json.status(400).json({message: err.message})
    })
  }

  module.exports = {
    createPost,
    getAllPosts,
    getPostsByCategory
  }