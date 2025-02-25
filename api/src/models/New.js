const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('new', {
    id: {
        type:DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
		allowNull: false
		},
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
    subtitle:{
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    text:{
      type: DataTypes.TEXT,
      allowNull:false,
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    videoLink:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  });
};