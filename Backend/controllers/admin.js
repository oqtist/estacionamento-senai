import { Acessos } from '../models/acessos.js'
import { Veiculos } from '../models/veiculos.js'
import { Usuario } from '../models/users.js'

export const listarUsuarios = async (req, res) => {
    try {
        const listaUsuarios = await Usuario.findAll()
        if (listaUsuarios.length == 0) {
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
        const listaAcessos = await Acessos.findAll({
            include: [
                { model: Usuario },
                { model: Veiculos }
            ]
        })
        if (listaAcessos.length == 0) {
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
        const listaVeiculos = await Veiculos.findAll({ include: Usuario })
        if (listaVeiculos.length == 0) {
            res.status(500).send({ mensagem: 'Nenhum veículo encontrado.' })
            return
        }
        res.status(200).send(listaVeiculos)
    } catch (err) {
        console.log(err)
    }
}

export const listarVagasOcupadas = async (req, res) => {
    try {
        const { count, rows } = await Acessos.findAndCountAll({
            where: {
                data_saida: null
            }
        })
        if (count == 0) {
            res.status(400).send({ mensagem: 'Nenhuma vaga ocupada.' })
            return
        }
        res.status(200).send({
            contagemOcupadas: count,
            acessos: rows
        })
    } catch (err) {
        console.log(err)
    }
}