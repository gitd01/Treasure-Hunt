// homeController=require('../app/http/controllers/homeController');
const authController=require('../app/http/controllers/authController');

//middlewares
const guest = require('../app/http/middlewares/guest');
const auth = require('.././app/http/middlewares/auth');
const admin = require('.././app/http/middlewares/admin');

function initRoutes(app, urlencodedParser){
    app.get('/login',guest, authController().login)
    app.post('/login', urlencodedParser,authController().postLogin)
    app.get('/register',guest, authController().register)
    app.post('/register', urlencodedParser ,authController().postRegister)
    app.post('/logout', urlencodedParser,authController().logout)
    app.get('/profile',authController().profile)
    app.post('/profile', urlencodedParser,authController().profile)
}

module.exports= initRoutes