import express from 'express'
const routerVeiculos = express.Router()
import { cadastroVeiculo, atualizarVeiculo, destruirVeiculo, listarVeiculos } from '../controllers/veiculos.js'
import { verificarToken } from '../middleware/auth.js'

routerVeiculos.post('/cadastro-veiculos', verificarToken, cadastroVeiculo)
routerVeiculos.put('/veiculos/:id', verificarToken, atualizarVeiculo)
routerVeiculos.delete('/veiculos/:id', verificarToken, destruirVeiculo)
routerVeiculos.get('/veiculos', verificarToken, listarVeiculos)

export { routerVeiculos }