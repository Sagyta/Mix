const {DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");

module.exports = (sequelize)=>{
	sequelize.define('user',{
		id: {
			type:DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false, 
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},	
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},	
		isAdmin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		}
	},{
		timestamps: false,
		hooks: {
		  beforeCreate: async (user) => {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);
		  },
		},
	  }
	);
	}