import express from 'express'
const routerAcesso = express.Router()
import { registrarEntrada, registrarSaida } from '../controllers/acessos.js'
import { verificarToken } from '../middleware/auth.js'

routerAcesso.post('/acesso/entrada/:id', verificarToken, registrarEntrada)
routerAcesso.post('/acesso/saida/:id', verificarToken, registrarSaida)

export { routerAcesso }