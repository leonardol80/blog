const { json } = require("sequelize");
const postControllers = require("./posts.controllers");
const {host} = require('../config')  //Para concatenar ruta a paginacion



const getAllPosts = (req, res) => {

  //? localhost:9000/api/v1/posts?offset=0&limit=20  (QueryParams) 
  const offset= Number(req.query.offset) || 0 // Contiene parametro inicial sino es 0por defecto
  const limit = Number(req.query.limit) || 10 // Igual pero cantidad a mostrar
  //? offset donde inicia
  //?limit Cantidad maxima de entidades a mostrar porpagina

  const urlBase= `${host}/api/v1/posts`

    postControllers.getAllPosts(offset,limit)
      .then((data) => {
        //? 29 - 25 >= 5 No se cumple nueva pagina el offset  es 25
        const nextPage = data.count - offset >= limit ? `${urlBase}?offset=${offset + limit}&limit=${limit}` : null
        //? 8 - 10 = -2
        const prevPage = offset - limit >= 0 ? `${urlBase}?offset=${offset-limit}&limit=${limit}` : null
        res.status(200).json({
          next: nextPage ,
          prev: prevPage,
          items: data.count,
          offset,
          limit,
          results:data.rows
        });
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