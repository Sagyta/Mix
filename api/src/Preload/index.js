const {User} = require('../db');

async function buildUser(){
    try{
        const user = await User.findOne()
        if (!user){
            await User.create({
                username: 'Admin',
                password: 'admin123',
                email: 'betina@gmail.com',
                isAdmin: true,
            })
        }
    }catch(error){
        next(error)
    }
}

module.exports = {
    buildUser,
}