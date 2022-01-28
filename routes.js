import express from "express";

import { contato , contatoRegister, deleteContato, edit, editIndex} from "./src/controllers/contatoController.js";
import { index } from "./src/controllers/homeController.js";
import { login, register, loginEnter ,logout } from "./src/controllers/loginController.js";
import { cadastro } from "./src/controllers/cadastroController.js";
import { loginRequired } from "./src/middlewares/midleware.js";
const routes = express.Router()




//*rotas da home

routes.get('/',index );

//* rotas de login

routes.get('/login/index', login) 
routes.get('/login/cadastro', cadastro)
routes.post('/login/register', register )
routes.post('/login/login', loginEnter  )
routes.get('/login/logout', logout  )

//* rotas de contato
routes.get('/contatos/index',loginRequired, contato )
routes.post('/contatos/register',loginRequired, contatoRegister  )
routes.get('/contatos/index/:id', loginRequired, editIndex)
routes.post('/contatos/edit/:id', loginRequired, edit )
routes.get('/contatos/delete/:id', loginRequired, deleteContato )
export default routes