const {Comment, User,New} = require('../db')


async function getComment (req,res,next){

    try{
        const { newId } = req.query;
        //console.log("los de newId", newId)

        let whereCondition = {};
        if(newId){
            whereCondition.newId = newId;
        }

        const comment = await Comment.findAll({
            where: whereCondition,     
            order: [['createdAt', 'DESC']],    
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: New,
                    attributes: ["title"]
                }
            ]
        });

       // console.log("🟢 Comentarios encontrados log de coment:", comment);

        const formattedComments = comment.map( comment => ({
            id: comment.id,
            comment: comment.comment,
            username: comment.user ? comment.user.username : comment.username,
            newTitle: comment.new ? comment.new.title : "Noticia desconocida",
            newId: comment.newId
        }));
       // console.log("los de format coment", formattedComments)
        res.send(formattedComments);
       // res.send(comment)
    } catch (error){
        next(error)
    }
}

async function getCommentId(req,res,next){
    const {id} = req.params
    try {
        const commentsId = await Comment.findByPk(id,{
            include:[
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: New,
                    attributes: ['title']
                }
            ],
            attributes: {exclude: ['newId', 'userId']}
        }) 
       // console.log(commentsId)      
        res.send(commentsId)
    } catch (error) {
        next(error)
    }
}

async function postComment(req,res,next){
   
  try {
    const { newId } = req.params;
    const { username, comment } = req.body;

    if (!comment || !username) {
      return res.status(400).json({ error: "El comentario y el nombre son obligatorios" });
    }

    const loggedUser= req.user ? await User.findByPk(req.user.id) : null;

    //console.log("🟡 Usuario logueado:", req.user);
   // console.log("🟢 Datos recibidos:", { newId, username, comment });

    const newComment = await Comment.create({
      comment,
      username: loggedUser ? loggedUser.username : username || "Anonimo",
      newId: newId,
      userId: loggedUser ? loggedUser.id : null,
    });

    res.json(newComment);
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }

}

async function putComment(req,res,next){
    const {id}= req.params
    const {comment} = req.body
    try {
        let updateComment = await Comment.findOne({
            where:{
                id:id,
            }
        })
        await updateComment.update({
            comment
        })
        res.send(updateComment)
    } catch (error) {
        next(error)
    }
}

async function deleteComment(req,res,next){
    const {id} = req.params
    try {
        const commentDelete = await Comment.findByPk(id)
        if(commentDelete){
            await commentDelete.destroy()
            return res.send('Comentario eliminado')
        }
        res.status(404).send('Comentario no encontrado')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getComment,
    postComment,
    getCommentId,
    putComment,
    deleteComment,
}