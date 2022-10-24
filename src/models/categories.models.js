const db =require('../utils/database')
const { DataTypes } = require("sequelize");

const Categories = db.define("categories",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
},{
    timestamps:false        //?Evita agregar a esta tablalos 2 campos finales
});

module.exports = Categories