const { User} = require("../db");
const { v4: uuidv4 } = require('uuid');
const {Op} = require('sequelize');
//const { getToken, getTokenData } = require('../../jwt.config');
//const { sendMail } = require('../../Emailers/emailerUser')
//const { getTemplate } = require('../../Templates/userEmailTemplate');

async function getUser(req, res, next){
    try{
        const users = await User.findAll()
        res.send(users)
    } catch (error){
        next(error)
    }
}

async function getUserId(req, res, next) {
  try {
    let regexUuid =
      /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
    let { id } = req.params;
    if (!regexUuid.test(id)) {
      return res.send({ msg: "Lo siento escriba un id valido" });
    } else {
      const usuario = await User.findByPk(id, {
        where:{id:id},
      });
      if (usuario === null) {
        return res.send({
          msg: "Lo siendo pero no hay ningun usuario con ese id",
        });
      } else {
        console.log(usuario);
        res.send(usuario);
      }
    }
  } catch (error) {
    next(error);
  }
}

async function postUser(req, res, next){

    const {username, password, email} = req.body
    try {
       //console.log('📥 Datos recibidos:', req.body);

       // Verifica si faltan datos
       if (!username || !password || !email) {
           return res.status(400).send('❌ Falta ingresar algún dato');
       }

       // Verifica si el usuario o email ya existen
       const exist = await User.findOne({
           where: {
               username
           }
       });

       const emailExist = await User.findOne({
           where: {
               email
           }
       });

       if (exist) {
           return res.status(400).send('❌ Ese nombre de usuario ya existe');
       }

       if (emailExist) {
           return res.status(400).send('❌ Ese email ya está registrado');
       }

       // Crea el usuario en la base de datos
       let newUser = await User.create({
           username,
           password,
           email
       });

       // Guarda el usuario explícitamente (opcional)
      // console.log('newUser')
       await newUser.save();

      // console.log('✅ Usuario creado:', newUser);
       return res.status(201).send('✅ Usuario creado con éxito');

   } catch (error) {
       console.error('❌ Error al crear usuario:', error);
       return res.status(500).send('Error en el servidor');
   }
};

async function getConfirm (req,res,next){
    try {
        // Obtener el token
        const { token } = req.params;
        
        // Verificar la data
        const data = await getTokenData(token);
 
        if(data === null) {
             return res.json({
                 success: false,
                 msg: 'Error al obtener data'
             });
        }
 
        //console.log(data);
 
        const { email, code } = data.data;
 
        // Verificar existencia del usuario
        const user = await User.findOne({ where: {email: email} }) || null;
 
        if(user === null) {
             return res.json({
                 success: false,
                 msg: 'Usuario no existe'
             });
        }
 
        // Verificar el código
        if(code !== user.code) {
             return res.status(404).redirect('https://img.freepik.com/vector-gratis/concepto-fallo-tecnico-landing-page_52683-10996.jpg?t=st=1656446573~exp=1656447173~hmac=ad04d6e9d78368c16673ae8df038eaf78586d38eed5b748ef373a1eae52e84b3&w=740');
        }
 
        // Actualizar usuario
        user.status = 'VERIFIED';
        await user.save();
 
        // Redireccionar a la confirmación
        return res.status(200).redirect('http://localhost:3000/home');
         
     } catch (error) {
         next(error);
         return res.json({
             success: false,
             msg: 'Error al confirmar usuario'
         });
     }
}

async function putUser (req,res,next){
    try {
        let regexUuid = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
       let {id} = req.params;
       const {username, email} = req.body
       

       if(!regexUuid.test(id)){
           return res.send({msg: 'ingrese un ID valido'});
       }else{
       const data = await User.findOne({where: {id:id}});
       if(data === null){
           return res.send({msg: 'Lo siento pero no se encuentra ese usuario'});
       }else {

        // verificar usuario

        const existingUser = await User.findOne({
            where: {
               username 
               // Asegura que no se compare con el propio usuario
            }
          });
          const existingMail = await User.findOne({
            where: {
               email,
               id: { [Op.ne]: id } // Asegura que no se compare con el propio usuario
            }
          });
    
          if (existingUser) {
            return res.status(400).json({
              msg: 'El nombre de usuario ya están en uso por otro usuario.'
            });
          } 
          if (existingMail) {
            return res.status(400).json({
              msg: 'El correo electrónico ya están en uso por otro usuario.'
            });
          }//fin verificar usuario
      
           data.set(req.body);
           await data.save();
           res.send(data);
       }
     }
    }catch(error){
        next(error)
    }
}

async function deleteUser (req,res,next){
    try{
        let regexUuid = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
    
        let {id} = req.params;
        if(!regexUuid.test(id)){
            return res.send({msg: 'Lo siento, escribe un id valido'})
        }else {
    
        const usuario = await User.findOne({where: {id:id}});
        if(usuario === null){
            return res.send({msg: 'Lo siento, no existe ese usuario en la base de datos'})
        }else {
            await usuario.destroy();
            return res.send({msg:'Usuario Eliminado exitosamente'});
        }
     }
     }catch(error){
        next(error);
     }
}

module.exports = {
    getUser,
    getUserId,
    postUser,
    getConfirm,
    putUser,
    deleteUser
}