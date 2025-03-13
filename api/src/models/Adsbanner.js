const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('adsbanner', {
    id: {
			type:DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name:{
    type:DataTypes.STRING,
    allowNull: false,
  }
},{
    timestamps: true,
  });
}