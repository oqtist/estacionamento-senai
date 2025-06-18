import jwt from 'jsonwebtoken'
import { Usuario } from '../models/users.js'
const segredoJwt = process.env.SEGREDO_JWT

export const verificarAdmin = async (req, res, next) => {
    try {
        const token = req.headers['authorization']
        if (!token) {
            res.status(400).send('Requisição Inválida')
        } else {
            const validacao = jwt.verify(token, segredoJwt)
            console.log(validacao)
            const userCheck = await Usuario.findByPk(validacao.idUsuario)

            if ((userCheck.tipo).toUpperCase() == 'ADMIN') {
                next()
            } else {
                res.status(401).send("O usuário não existe ou não possui permissão para acessar esta rota.")
            }
        }

    } catch (erro) {
        console.log('erro', erro)
        res.status(401).send({ mensagem: 'Token Invalido' })
    }
}