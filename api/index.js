const server = require('./src/app')
const { conn } = require('./src/db');

const PORT = process.env.PORT || 3001

conn.sync({ force: false }).then(() => { 
  
  server.listen(PORT, () => {
    console.log('Servidor corriendo en 3001'); 
  });
}); 