import express from 'express'
const routerUser = express.Router()
import { cadastroUsuario, login, atualizarUsuario, destruirUsuario } from '../controllers/users.js'
import { verificarToken } from '../middleware/auth.js'

routerUser.post('/cadastro-usuario', cadastroUsuario)
routerUser.post('/login', login)
routerUser.put('/usuario/:id', verificarToken, atualizarUsuario)
routerUser.delete('/usuario/:id', verificarToken, destruirUsuario)

export { routerUser }