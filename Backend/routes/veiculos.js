import express from 'express'
const routerVeiculos = express.Router()
import { cadastroVeiculo, atualizarVeiculo, destruirVeiculo } from '../controllers/veiculos.js'
import { verificarToken } from '../middleware/auth.js'

routerVeiculos.post('/cadastro-veiculos', verificarToken, cadastroVeiculo)
routerVeiculos.put('/veiculos/:id', verificarToken, atualizarVeiculo)
routerVeiculos.delete('/veiculos/:id', verificarToken, destruirVeiculo)

export { routerVeiculos }