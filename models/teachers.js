const { DataTypes } = require('sequelize');
const sequelize = require('../init/db');

const Teachers = sequelize.define(
    'Teachers',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING(10),
        },
    },
    {
        tableName: 'teachers',
        timestamps: false,
    },
);

module.exports = Teachers;