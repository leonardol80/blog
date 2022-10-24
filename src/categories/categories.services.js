const categoryControllers = require("./categories.controllers");

const getAllCategories = (req, res) => {
  categoryControllers
    .getAllCategories()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const getCategoryById = (req, res) => {
  const id = req.params.id;
  categoryControllers
    .getCategoryById(id)
    .then((data) => {
        if (data){
            res.status(200).json(data)
        } else{
            res.status(404).json({ message: 'Invalid ID' })
        }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

const postCategory = (req, res) => {
  const {name } = req.body;

    if (name) {
        //? Ejecutamos el controller
        categoryControllers.createCategory({
            name
        })
            .then( data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    } else {
    //? Error cuando no mandan todos los datos necesarios para crear un registro
        res.status(400).json({message: 'Err, all fields must be completed', fields: {
            name: 'string'
        }})
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    postCategory
}