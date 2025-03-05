const {Category} = require('../db')
const { Op } = require("sequelize"); // Asegúrate de importar Op

async function getCategory (req,res,next){
    try {
        const category = await Category.findAll({
            attributes: ['id', 'name']
        });
        res.send(category)

    } catch (error) {
        next(error)
    }
}

async function getCategoryId(req,res,next){
    const {id} = req.params
    try {
        const categoryId = await Category.findByPk(id)
        res.send(categoryId)
    } catch (error) {
        next(error)
    }
}

async function postCategory(req,res,next){
    const {name} = req.body
    try {
        const exist = await Category.findAll({
            where:{
                name
            }
        })
        if(exist.length) return res.status(400)
        .send('Rechazado, esa categoria ya existe en la base de datos');

        if(!name){
            res.status(404).send('Debe ingresar nombre de categoria')
        }else{
             let newCategory = await Category.create({
                name,
            })
            return res.status(200).json({ 
                message: 'Categoría Creada', 
                category: newCategory 
            });
        }
    } catch (error) {
        next(error)
    }
}

async function putCategory(req, res, next) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Verificar si la categoría ya existe con el mismo nombre
        const existingCategory = await Category.findOne({
            where: {
                name,
                id: { [Op.ne]: id } // Excluye la categoría actual
            }
        });

        if (existingCategory) {
            return res.status(400).json({ message: "Esta categoría ya existe." });
        }

        // Buscar la categoría a actualizar
        let updateCategory = await Category.findByPk(id);

        if (!updateCategory) {
            return res.status(404).json({ message: "Categoría no encontrada." });
        }

        // Actualizar la categoría
        await updateCategory.update({ name });

        res.status(200).json(updateCategory);
    } catch (error) {
        next(error);
    }
}
/*async function putCategory(req,res,next){
    try{
        const { id }= req.params
        let updateCategory = await Category.findByPk(id)

        await updateCategory.update({name: req.body.name})
        res.status(200).send(updateCategory)
    }catch(error){
        next(error)
    }
}*/

async function deleteCategory(req,res,next){
    const {id} = req.params
    try {
        const delCategory = await Category.findByPk(id)
        if(delCategory){
            await delCategory.destroy()
            return res.send('Categoría eliminada con éxito')
        }
        res.status(404).send('Categoría no encontrada')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getCategory,
    getCategoryId,
    postCategory,
    putCategory,
    deleteCategory,
}