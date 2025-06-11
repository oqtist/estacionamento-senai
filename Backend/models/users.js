import { database } from "../database.js";
import { DataTypes } from "sequelize";

const Usuario = database.define(
    'usuario',
    {
        id_usuario: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    schema: 'estacionamento',
    freezeTableName: true,
    timestamps: false
})

export { Usuario } 