import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { routerUser } from './routes/users.js'
import { routerVeiculos } from './routes/veiculos.js'
const app = express()

import { database } from './database.js'
import { Usuario } from './models/users.js'
import { Veiculos } from './models/veiculos.js'
import { Acessos } from './models/acessos.js'
import { routerAcesso } from './routes/acessos.js'

app.use(cors())
app.use(express.json())
app.use(routerUser, routerVeiculos, routerAcesso)

// try {
//     await database.sync({ force: true })
// } catch (err) {
//     console.log(err)
// }

app.listen(3000, () => {
    console.log('Servidor Iniciado na porta 3000.')
})