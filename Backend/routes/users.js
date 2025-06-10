import express from 'express'
const router = express.Router()
import { cadastroUsuario, login, atualizarUsuario, destruirUsuario } from '../controllers/users.js'
import { verificarToken } from '../middleware/auth.js'

router.post('/cadastro', cadastroUsuario)
router.post('/login', login)
router.put('/usuario/:id', verificarToken, atualizarUsuario)
router.delete('/usuario/:id', verificarToken, destruirUsuario)

export { router }