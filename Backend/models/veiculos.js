import { database } from "../database.js";
import { DataTypes } from "sequelize";
import { Usuario } from "./users.js";
import { Acessos } from "./acessos.js";

const Veiculos = database.define(
    'veiculos',
    {
        id_veiculo: {
            type: DataTypes.SMALLINT,
            primaryKey: true,
            autoIncrement: true,
            autoIncrementIdentity: true
        },
        placa: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imagem: {
            type: DataTypes.STRING
        }
    }, {
    schema: 'estacionamento',
    freezeTableName: true,
    timestamps: false
})

Usuario.hasMany(Veiculos, {
    foreignKey: {
        allowNull: false,
        name: 'id_usuario'
    }
})

Veiculos.hasOne(Acessos, {
    foreignKey: {
        allowNull: false,
        name: 'id_veiculo'
    }
})

export { Veiculos }