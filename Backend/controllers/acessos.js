import jwt from 'jsonwebtoken'
import { Acessos } from '../models/acessos.js'
import { Veiculos } from '../models/veiculos.js'
import { Sequelize, where } from 'sequelize'
const segredoJwt = process.env.SEGREDO_JWT

export const registrarEntrada = async (req, res) => {
    try {
        const id = req.params.id

        const userCheck = await res.locals.user
        const veiculoCheck = await Veiculos.findByPk(id)
        const acessoCheck = await Acessos.findOne({ where: { id_veiculo: veiculoCheck.dataValues.id_veiculo, data_saida: null } })

        if (acessoCheck) {
            res.status(500).send({ mensagem: 'Este veículo já está estacionado.' })
            return
        }
        if (userCheck && veiculoCheck && userCheck.dataValues.id_usuario == veiculoCheck.dataValues.id_usuario) {

            const id_veiculo = veiculoCheck.dataValues.id_veiculo
            const entrada = await Acessos.create({ id_veiculo })
            res.status(200).send({ mensagem: 'Entrada Registrada!', data: entrada })
        }
        else {
            res.status(500).send({ mensagem: 'Veículo não encontrado.' })
        }

    } catch (err) {
        console.log(err)
    }
}

export const registrarSaida = async (req, res) => {
    try {
        const id = req.params.id

        const userCheck = await res.locals.user
        const veiculoCheck = await Veiculos.findByPk(id)
        const acessoCheck = await Acessos.findOne({ where: { id_veiculo: veiculoCheck.dataValues.id_veiculo, data_saida: null } })

        if(acessoCheck) {
            const saida = acessoCheck.data_saida = Sequelize.literal('CURRENT_TIMESTAMP')
            await acessoCheck.save()
            res.status(200).send({mensagem: 'Saída Registrada!', data: saida})
        } else {
            res.status(500).send({mensagem: 'Registro de entrada para este ID não encontrado.'})
        }

    } catch (err) {
        console.log(err)
    }
}