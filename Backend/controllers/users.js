import jwt from 'jsonwebtoken'
import { Usuario } from '../models/users.js'
const segredoJwt = process.env.SEGREDO_JWT

const cadastroUsuario = async (req, res) => {
    try {
        const { nome, tipo, senha, email } = req.body
        const userCheck = await Usuario.findOne({ where: { email } })

        if (!nome || !tipo || !senha || !email) {
            res.status(500).send({ mensagem: 'Um dos campos não foi preenchido. Tente Novamente.' })
            return
        }
        if (userCheck) {
            res.status(500).send({ mensagem: 'Já existe um usuário com este email. Tente Novamente.' })
            return
        }

        const usuario = await Usuario.create({ nome, senha, email, tipo })
        res.status(200).send({ mensagem: 'Usuário Cadastrado!', data: usuario })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ err })
    }
}

const login = async (req, res) => {
    try {
        const { email, senha } = req.body
        const emailCheck = await Usuario.findOne({ where: { email: email } })
        const senhaCheck = await Usuario.findOne({ where: { senha: senha } })

        console.log(emailCheck)

        if (!emailCheck) {
            res.status(500).send({ mensagem: `${email} não encontrado. Tente outro e-mail ou registre-se.` })
            return
        }
        if (!senhaCheck) {
            res.status(500).send({ mensagem: `Senha Incorreta. Tente novamente.` })
            return
        }
        const token = jwt.sign({ idUsuario: emailCheck.dataValues.id_usuario }, segredoJwt, { expiresIn: "1d" })
        res.status(201).send({ token: token })
    } catch (err) {
        console.log(err)
    }
}

const atualizarUsuario = async (req, res) => {
    try {
        const { nome, tipo, email, senha } = req.body

        const userCheck = await res.locals.user
        if (userCheck) {
            if (nome) {
                userCheck.nome = nome
            }
            if (tipo) {
                userCheck.tipo = tipo
            }
            if (email) {
                userCheck.email = email
            }
            if (senha) {
                userCheck.senha = senha
            }

            if (nome || tipo || email || senha) {
                await userCheck.save()
                res.status(200).send({ mensagem: "Usuário Atualizado!", usuario: userCheck.dataValues })
            } else {
                res.status(200).send({ mensagem: 'Nenhuma mudança detectada.' })
            }
        } else {
            res.status(400).send({ mensagem: 'Token válido, mas não para este usuário. Tente Novamente.' })
        }

    } catch (err) {
        console.log(err)
    }
}

const destruirUsuario = async (req, res) => {
    try {
        const userCheck = await res.locals.user

        if (userCheck) {
            await userCheck.destroy()
            res.status(200).send({ mensagem: `Usuário "${userCheck.dataValues.nome}" (ID: ${userCheck.dataValues.id_usuario}) Apagado.` })
        } else {
            res.status(400).send('Token válido, mas não para este usuário. Tente Novamente.')
        }

    } catch (err) {
        console.log(err)
    }
}

export { cadastroUsuario, login, atualizarUsuario, destruirUsuario }