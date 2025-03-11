const server = require('./src/app')
const { conn } = require('./src/db');
const {buildUser} = require('./src/Preload/index')

const PORT = process.env.PORT || 3001

conn.sync({ force: false }).then(() => { 

  server.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
  });
  
  // Maneja todas las rutas que no son API
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

  server.listen(PORT, () => {
    console.log('Servidor corriendo en 3001'); 

    buildUser();
  });
}); 