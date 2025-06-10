import { database } from "../database.js";
import { DataTypes } from "sequelize";
import { Veiculos } from "./veiculos.js";

const Acessos = database.define(
    'Acessos',
    {
        id_acesso: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        },
        data_entrada: {
            type: DataTypes.TIME,
            defaultValue: DataTypes.NOW
        },
        data_saida: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
    schema: 'estacionamento',
    freezeTableName: true,
    timestamps: false
})

export { Acessos }