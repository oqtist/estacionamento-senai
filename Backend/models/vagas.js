import { database } from "../database.js";
import { DataTypes, Sequelize } from "sequelize";

const Vagas = database.define(
    'vagas',
    {
        id_vaga: {
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

export { Vagas }