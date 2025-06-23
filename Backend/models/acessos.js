import { database } from "../database.js";
import { DataTypes, Sequelize } from "sequelize";
import { Veiculos } from "./veiculos.js";
import { Usuario } from "./users.js";

const Acessos = database.define(
    'acessos',
    {
        id_acesso: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        },
        data_entrada: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        },
        data_saida: {
            type: DataTypes.DATE
        }
    }, {
    schema: 'estacionamento',
    freezeTableName: true,
    timestamps: false
})

Acessos.belongsTo(Veiculos, {
    foreignKey: 'id_veiculo'
})

Acessos.belongsTo(Usuario, {
    foreignKey: 'id_usuario'
})

export { Acessos }