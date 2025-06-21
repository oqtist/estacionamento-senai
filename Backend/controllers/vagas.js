import { Vagas } from '../models/vagas.js'
import { Veiculos } from '../models/veiculos.js';

let QUANTIA_VAGAS = 0

export const vagasQuantia = async (req, res) => {
    try {
        const { vagas } = req.body
        if (vagas >= 0 && typeof vagas == 'number') {
            QUANTIA_VAGAS = vagas;
            res.status(200).send({ mensagem: `Quantia de vagas alterada para ${vagas}` })
        } else {
            res.status(400).send('Valor inválido. Tente outro.')
        }
    } catch (err) {
        console.log(err)
    }
}

export const entrarVaga = async (req, res) => {
    try {
        const id = req.params.id

        const userCheck = await res.locals.user
        const veiculoCheck = await Veiculos.findByPk(id)
        const redundanciaCheck = await Vagas.findOne({ where: { id_veiculo: veiculoCheck.dataValues.id_veiculo } })
        const vagasOcupadas = await Vagas.count()

        if (redundanciaCheck) {
            res.status(400).send({ mensagem: 'Este veículo já está estacionado.' })
            return
        }
        if (userCheck && veiculoCheck && userCheck.dataValues.id_usuario == veiculoCheck.dataValues.id_usuario) {
            const id_veiculo = veiculoCheck.dataValues.id_veiculo
            if (vagasOcupadas >= QUANTIA_VAGAS) {
                res.status(400).send({ mensagem: 'Todas as vagas estão ocupadas.' })
            } else {
                const entrada = await Vagas.create({ id_veiculo })
                res.status(200).send({ mensagem: 'Entrada Registrada!', data: entrada })
            }
        }
        else {
            res.status(400).send({ mensagem: 'Veículo não encontrado.' })
        }
    } catch (err) {
        console.log(err)
    }
}

export const sairVaga = async (req, res) => {
    try {
        const id = req.params.id

        const userCheck = await res.locals.user
        const veiculoCheck = await Veiculos.findByPk(id)
        const vagaCheck = await Vagas.findOne({
            where:
            {
                id_veiculo: veiculoCheck.dataValues.id_usuario
            }
        })

        if(userCheck && veiculoCheck) {
            await vagaCheck.destroy()
            res.status(200).send({mensagem: 'Saída registrada!'})
        } else {
            res.status(500).send({erro: 'Algo deu errado. Tente novamente.'})
        }

    } catch (err) {
        console.log(err)
    }
}