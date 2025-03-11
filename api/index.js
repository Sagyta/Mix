const server = require('./src/app')
const { conn } = require('./src/db');
const {buildUser} = require('./src/Preload/index')

const PORT = process.env.PORT || 3001

conn.sync({ force: false }).then(() => { 

  server.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
  });
  
  server.listen(PORT, () => {
    console.log('Servidor corriendo en 3001'); 

    buildUser();
  });
}); 