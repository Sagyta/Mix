const {New, Comment, User, Category} = require('../db')
const {Op} = require('sequelize');


async function getNews (req,res,next){
    try {
        const {title} = req.query
                
        const newsFind = await New.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Category,
                    attributes: ['name']
                }
            ],
            attributes:['id','title', 'volanta', 'subtitle','text',  'image', 'videoLink', 'createdAt'],
            order: [['createdAt', 'DESC']]
        })
        
        if(title){
           // console.log(title)
            let findTitle= newsFind.filter(e=>e.title.toLowerCase().includes(title.toLowerCase()))
            if(findTitle.length) return res.send(findTitle)
            else return res.status(404).send('No hay noticias que contengan esta palabra en el título')
        }
        console.log("Fecha en el backend antes de enviarla:", newsFind.createdAt);
        res.send(newsFind)
    } catch (error) {
        next(error)
    }
}

async function getNewsId(req,res,next){
    const {id} = req.params
    try {
        const newsId = await New.findByPk(id,{
            include:[
                {
                model: User,
                attributes: ['username']
                },
                {
                model: Category,
                attributes: ['name']
                },
                {
                model: Comment,
                include:[{
                    model: User,
                    attributes: ['username']
                }],
                attributes: ['id','comment', 'username', 'createdAt']
                },
            ],
            attributes: {exclude: ['categoryId', 'userId']}
        })
        console.log('fecha en newsid', newsId.createdAt)
        res.send(newsId)
    } catch (error) {
        next(error)
    }
}

async function postNews(req, res, next) {
    try {
        //console.log("Parámetros recibidos:", req.params);
        const { userId } = req.params;
        //console.log("userId recibido:", userId);

        const createBy = await User.findByPk(userId);
        //console.log("Usuario encontrado:", createBy);

        if (!createBy) {
            return res.status(404).send("Usuario no encontrado");
        }

        const { title, volanta, subtitle, text, image, videoLink, categoryId } = req.body;
       // console.log("Datos recibidos:", { title, subtitle, text, image });

        const exist = await New.findAll({
            where: { title }
        });
       // console.log("Noticias con el mismo título:", exist);

        if (exist.length) {
            return res.status(400).send("Rechazado, esa noticia ya existe en la base de datos");
        }

        const insertNews = await New.create({
            title,
            volanta,
            subtitle,
            text,
            image,
            videoLink,
            categoryId
        });
       // console.log("Noticia creada:", insertNews);

        await createBy.addNew(insertNews);
       // console.log("Relación usuario-noticia creada");

        res.send(insertNews);
    } catch (error) {
        console.error("Error en postNews:", error);
        next(error);
    }
}

async function putNews(req,res,next){
    const {id}= req.params
    const {
        title,
        volanta,
        subtitle,
        text,
        image,
        videoLink,
        categoryId
    } = req.body
    try {
        let updateNews = await New.findOne({
            where:{
                id:id,
            }
        })
        await updateNews.update({
            title,
            volanta,
            subtitle,
            text,
            image,
            videoLink,
            categoryId
        })
        res.send(updateNews)
    } catch (error) {
        next(error)
    }
}

async function deleteNews(req,res,next){
    const {id} = req.params
    try {
        const newsDelete = await New.findByPk(id)
        if(newsDelete){
            await newsDelete.destroy()
            return res.send('Noticia eliminada')
        }
        res.status(404).send('noticia no encontrada')
    } catch (error) {
        next(error)
    }
}

async function getNewsByCategory(req, res, next) {
    try {
        const categoryId = req.params.id;

        if (!categoryId || categoryId.length !== 36) {
            return res.status(400).json({ error: "ID de categoría inválido" });
        }

        const noticias = await New.findAll({
            where: { categoryId },
            attributes: ['id', 'title', 'volanta', 'subtitle', 'text', 'image', 'videoLink', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        res.json(noticias);
    } catch (error) {
        console.error('Error obteniendo noticias por categoría:', error);
        res.status(500).json({ error: 'Error al obtener las noticias' });
    }
}

async function getRelatedNews(req, res, next){
    const{id} = req.params;

    try{
        const noticia = await New.findByPk(id);
        if(!noticia) return res.status(404).json({message:"Noticia no encontrada"});

        const relatedNews = await New.findAll({
            where: {
                categoryId: noticia.categoryId,
                id:{ [ Op.ne]: id },
            },
            limit:4,
            include: {
                model: Category,
                attributes: ['name'],
            },
        });
        res.json(relatedNews);
        } catch (error) {
         res.status(500).json({ message: "Error al obtener noticias relacionadas", error });
    }
};

module.exports = {
    getNews,
    postNews,
    getNewsId,
    putNews,
    deleteNews,
    getNewsByCategory,
    getRelatedNews,
}