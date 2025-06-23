import express from 'express'
const routerAdmin = express.Router()

import { verificarAdmin } from '../middleware/auth_admin.js'
import { listarAcessos, listarUsuarios, listarVeiculos, infoGetter } from '../controllers/admin.js'

routerAdmin.get('/admin/acessos/', verificarAdmin, listarAcessos)
routerAdmin.get('/admin/usuarios/', verificarAdmin, listarUsuarios)
routerAdmin.get('/admin/veiculos/', verificarAdmin, listarVeiculos)
routerAdmin.post('/admin/info/', verificarAdmin, infoGetter) //contraditório por natureza, mas visto que postamos informações na requisição..

export { routerAdmin }