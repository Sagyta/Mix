require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mix`, {
  logging: false, 
  native: false, 
  define: {timestamps: false}
})
//};
const basename = path.basename(__filename);

const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { New, Comment, User, Category} = sequelize.models;


// Aca vendrian las relaciones
// modelo.hasMany(modelo) de 1 a muchos;
// modelo.belongsTo(modelo) de muchos a 1

New.hasMany(Comment);
Comment.belongsTo(New); 

Category.hasMany(New, {foreignKey: 'categoryId'});
New.belongsTo(Category,{foreignKey: 'categoryId'});

User.hasMany(New)
New.belongsTo(User);

User.hasMany(Comment, {foreignKey: 'userId'});
Comment.belongsTo(User, {foreignKey: 'userId'});

// 🔥 Verificamos si la conexión funciona
sequelize.authenticate()
    .then(() => console.log('✅ Conectado a PostgreSQL'))
    .catch(err => console.error('❌ Error en la conexión:', err));

    console.log('📌 Modelos cargados:', Object.keys(sequelize.models));
    
module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};