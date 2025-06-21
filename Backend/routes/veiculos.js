import express from 'express'
const routerVeiculos = express.Router()
import { cadastroVeiculo, atualizarVeiculo, destruirVeiculo, listarVeiculos, veiculosExclusaoConta } from '../controllers/veiculos.js'
import { verificarToken } from '../middleware/auth.js'

routerVeiculos.post('/cadastro-veiculos', verificarToken, cadastroVeiculo)
routerVeiculos.put('/veiculos/:id', verificarToken, atualizarVeiculo)
routerVeiculos.delete('/veiculos/:id', verificarToken, destruirVeiculo)
routerVeiculos.get('/veiculos', verificarToken, listarVeiculos)
routerVeiculos.delete('/veiculos-exclusao-conta', verificarToken, veiculosExclusaoConta)

export { routerVeiculos }