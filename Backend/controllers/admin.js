import { Acessos } from '../models/acessos.js'
import { Veiculos } from '../models/veiculos.js'
import { Usuario } from '../models/users.js'

export const listarUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await Usuario.findAll()
        if (!listaUsuarios) {
            res.status(500).send({ mensagem: 'Nenhum usuário encontrado.' })
            return
        }
        res.status(200).send({ listaUsuarios })
    } catch (err) {
        console.log(err)
    }
}

export const listarAcessos = async (req, res) => {
    try {
        const listaAcessos = await Acessos.findAll()
        if (!listaAcessos) {
            res.status(500).send({ mensagem: 'Nenhum acesso encontrado.' })
            return
        }
        res.status(200).send({ listaAcessos })
    } catch (err) {
        console.log(err)
    }
}

export const listarVeiculos = async (req, res) => {
    try {
        const listaVeiculos = await Veiculos.findAll()
        if (!listaVeiculos) {
            res.status(500).send({ mensagem: 'Nenhum veículo encontrado.' })
            return
        }
        res.status(200).send({ listaVeiculos: listaVeiculos })
        console.log(listaVeiculos)
    } catch (err) {
        console.log(err)
    }
}

export const listarVagasOcupadas = async (req, res) => {
    try {
        const vagasOcupadas = await Acessos.findAndCountAll({ where: { data_saida: null } })
        if (!vagasOcupadas) {
            res.status(400).send({ mensagem: 'Nenhuma vaga ocupada.' })
            return
        }
        res.status(200).send({ vagasOcupadas })
    } catch (err) {
        console.log(err)
    }
}

export const infoGetter = async (req, res) => {
    try {
        const { id_veiculo, id_usuario } = req.body
        if (id_veiculo) {
            const dadosVeiculo = await Veiculos.findByPk(id_veiculo)
            res.status(200).send(dadosVeiculo)
        }
        if (id_usuario) {
            const dadosUsuario = await Usuario.findByPk(id_usuario)
            res.status(200).send(dadosUsuario)
        }
    } catch (err) {
        console.log(err)
    }
}