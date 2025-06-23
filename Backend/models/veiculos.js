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
        status_vaga: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
    schema: 'estacionamento',
    freezeTableName: true,
    timestamps: false
})

Usuario.hasMany(Veiculos, {
  foreignKey: { name: 'id_usuario', allowNull: false }
})
Usuario.hasMany(Acessos, {
  foreignKey: { name: 'id_usuario', allowNull: false }
})

Veiculos.belongsTo(Usuario, {
  foreignKey: { name: 'id_usuario', allowNull: false }
})
Veiculos.hasMany(Acessos, {
  foreignKey: { name: 'id_veiculo', allowNull: false }
})

Acessos.belongsTo(Veiculos, {
  foreignKey: { name: 'id_veiculo', allowNull: false }
})
Acessos.belongsTo(Usuario, {
  foreignKey: { name: 'id_usuario', allowNull: false }
})


export { Veiculos }