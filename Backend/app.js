import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { router } from './routes/users.js'
const app = express()

import { database } from './database.js'
import { Usuario } from './models/users.js'
import { Veiculos } from './models/veiculos.js'
import { Acessos } from './models/acessos.js'

app.use(cors())
app.use(express.json())
app.use(router)

// try {
//     await database.sync({ force: true })
// } catch (err) {
//     console.log(err)
// }

app.listen(3000, () => {
    console.log('Servidor Iniciado na porta 3000.')
})