import { Sequelize } from 'sequelize'
import { Veiculos } from '../models/veiculos.js'
import { database } from '../database.js'

export const cadastroVeiculo = async (req, res) => {
    try {
        const { placa, modelo, cor } = req.body

        const userCheck = await res.locals.user
        const vehicleCheck = await Veiculos.findOne({ where: { placa } })

        if (userCheck) {
            if (!placa || !modelo || !cor) {
                res.status(500).send({ mensagem: 'Um dos campos não foi preenchido. Tente Novamente.' })
                return
            }
            if (vehicleCheck) {
                res.status(500).send({ mensagem: 'Um veículo com esta placa já foi registrado. Tente Novamente.' })
                return
            }

            const veiculo = await Veiculos.create({ placa, modelo, cor, id_usuario: userCheck.dataValues.id_usuario })
            res.status(200).send({ mensagem: 'Veículo Cadastrado!', data: veiculo })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ err })
    }
}

export const atualizarVeiculo = async (req, res) => {
    try {
        const { placa, modelo, cor } = req.body
        const id = req.params.id

        const userCheck = await res.locals.user
        const vehicleCheck = await Veiculos.findByPk(id)

        if (userCheck) {
            if (vehicleCheck) {
                if (placa) {
                    vehicleCheck.placa = placa
                }
                if (modelo) {
                    vehicleCheck.modelo = modelo
                }
                if (cor) {
                    vehicleCheck.cor = cor
                }

                if (placa || modelo || cor) {
                    await vehicleCheck.save()
                    res.status(200).send({ mensagem: 'Veículo Atualizado!', veiculo: vehicleCheck.dataValues })
                } else {
                    res.status(500).send({ mensagem: 'Nenhuma mudança realizada.' })
                }
            } else {
                res.status(400).send({ mensagem: 'Veículo não encontrado. Tente Outro.' })
            }
        } else {
            res.status(500).send('Usuário incorreto para este veículo.')
        }
    } catch (err) {
        console.log(err)
    }
}

export const destruirVeiculo = async (req, res) => {
    try {
        const id = req.params.id

        const userCheck = await res.locals.user
        const vehicleCheck = await Veiculos.findByPk(id)

        if (userCheck) {
            if (vehicleCheck) {
                await vehicleCheck.destroy()
                res.status(200).send({ mensagem: `Veículo '${vehicleCheck.dataValues.modelo}', placa '${vehicleCheck.dataValues.placa}' removido.` })
            } else {
                res.status(400).send({mensagem: 'Veículo não encontrado.'})
            }
        } else {
            res.status(500).send('Usuário incorreto para este veículo.')
        }
    } catch (err) {
        console.log(err)
    }
}