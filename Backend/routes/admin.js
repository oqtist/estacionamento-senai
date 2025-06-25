import express from 'express'
const routerAdmin = express.Router()

import { verificarAdmin } from '../middleware/auth_admin.js'
import { listarAcessos, listarUsuarios, listarVeiculos, listarVagasOcupadas } from '../controllers/admin.js'

routerAdmin.post('/admin/acessos/', verificarAdmin, listarAcessos)
routerAdmin.post('/admin/usuarios/', verificarAdmin, listarUsuarios)
routerAdmin.post('/admin/veiculos/', verificarAdmin, listarVeiculos)
routerAdmin.post('/admin/vagas/', verificarAdmin, listarVagasOcupadas)

export { routerAdmin }