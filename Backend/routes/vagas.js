import express from 'express'
const routerVagas = express.Router()
import { entrarVaga, sairVaga, vagasQuantia } from '../controllers/vagas.js'
import { verificarToken } from '../middleware/auth.js'
import { verificarAdmin } from '../middleware/auth_admin.js'

routerVagas.post('/vagas/entrada', verificarToken, entrarVaga)
routerVagas.post('/vagas/saida', verificarToken, sairVaga)
routerVagas.post('/admin/vagas-quantia', verificarAdmin, vagasQuantia)

export { routerVagas }