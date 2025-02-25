const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('comment', {
    id: {
			type:DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    username: {  // 🔹 Verifica que esta línea existe
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },
  {
    timestamps: true,
  });
};