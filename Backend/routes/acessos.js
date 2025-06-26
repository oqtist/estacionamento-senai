import express from 'express'
const routerAcesso = express.Router()
import { registrarEntrada, registrarSaida, alterarQuantiaVagas, listarQuantiaVagas} from '../controllers/acessos.js'
import { verificarToken } from '../middleware/auth.js'
import { verificarAdmin } from '../middleware/auth_admin.js'

routerAcesso.post('/acesso/entrada/:id', verificarToken, registrarEntrada)
routerAcesso.post('/acesso/saida/:id', verificarToken, registrarSaida)
routerAcesso.get('/acesso/listar-quantia-vagas/', verificarToken, listarQuantiaVagas)
routerAcesso.post('/acesso/admin/quantia-vagas/', verificarAdmin, alterarQuantiaVagas)

export { routerAcesso }