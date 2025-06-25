import { Acessos } from '../models/acessos.js'
import { Veiculos } from '../models/veiculos.js'
import { Usuario } from '../models/users.js'

export const listarUsuarios = async (req, res) => {
    try {
        const pagina = Number(req.body.pagina) || 1
        const limit = Number(req.body.limit) || 10
        const offset = (pagina - 1) * limit

        const { count, rows } = await Usuario.findAndCountAll({ offset, limit, order: [['nome', 'DESC']] })
        if (count == 0) {
            res.status(500).send({ mensagem: 'Nenhum usuário encontrado.' })
            return
        }
        res.status(200).send({ totalUsuarios: count, totalPaginas: Math.ceil(count / limit), paginaAtual: pagina, listarUsuarios: rows })
    } catch (err) {
        console.log(err)
    }
}

export const listarAcessos = async (req, res) => {
    try {
        const pagina = Number(req.body.pagina) || 1
        const limit = Number(req.body.limit) || 10
        const offset = (pagina - 1) * limit

        const { count, rows } = await Acessos.findAndCountAll({
            offset, limit, order: [['data_entrada', 'DESC']],
            include: [
                { model: Usuario },
                { model: Veiculos }
            ]
        })
        if (count == 0) {
            res.status(500).send({ mensagem: 'Nenhum acesso encontrado.' })
            return
        }
        res.status(200).send({ totalAcessos: count, totalPaginas: Math.ceil(count / limit), paginaAtual: pagina, listarAcessos: rows })
    } catch (err) {
        console.log(err)
    }
}

export const listarVeiculos = async (req, res) => {
    try {
        const pagina = Number(req.body.pagina) || 1
        const limit = Number(req.body.limit) || 10
        const offset = (pagina - 1) * limit

        const { count, rows } = await Veiculos.findAndCountAll({ offset, limit, order: [['modelo', 'DESC']], include: Usuario })
        if (count == 0) {
            res.status(500).send({ mensagem: 'Nenhum veículo encontrado.' })
            return
        }
        res.status(200).send({ totalVeiculos: count, totalPaginas: Math.ceil(count / limit), paginaAtual: pagina, listarVeiculos: rows })
    } catch (err) {
        console.log(err)
    }
}

export const listarVagasOcupadas = async (req, res) => {
    try {
        const pagina = Number(req.body.pagina) || 1
        const limit = Number(req.body.limit) || 10
        const offset = (pagina - 1) * limit

        const { count, rows } = await Acessos.findAndCountAll({
            offset, limit, order: [['data_entrada', 'DESC']],
            where: {
                data_saida: null
            },
            include: [
                { model: Usuario },
                { model: Veiculos }
            ]
        })

        if (count == 0) {
            res.status(400).send({ mensagem: 'Nenhuma vaga ocupada.' })
            return
        }
        res.status(200).send({
            totalVagasOcupadas: count,
            totalPaginas: Math.ceil(count / limit),
            paginaAtual: pagina,
            listarVagasOcupadas: rows
        })
    } catch (err) {
        console.log(err)
    }
}