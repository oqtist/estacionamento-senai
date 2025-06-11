import { database } from "../database.js";
import { DataTypes, Sequelize } from "sequelize";
import { Veiculos } from "./veiculos.js";

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

export { Acessos }