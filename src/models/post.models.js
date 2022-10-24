//? Crea el modelo de la tabla Post con sus campos
//? La llave foranea seidentifica con elprefijo dela tabla a la cual pertenece

const db =require('../utils/database')
const { DataTypes } = require("sequelize");
const Users = require('./users.models');
const Categories = require('./categories.models');

const Post = db.define("post",{
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,  //?campo text notienelimite de caracteres
        allowNull: false,
      },
      //Foranea hace referencia a users
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
        references: {
            key: 'id',  //ID es la columna de la tabla users
            model: Users
        }
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "category_id",
        references: {
            key: 'id',
            models: Categories
        }
      },
});

module.exports = Post