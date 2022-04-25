const { DataTypes } = require('sequelize');
const sequelize = require('../init/db');

const Students = sequelize.define(
    'Students',
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
        tableName: 'students',
        timestamps: false,
    },
);

module.exports = Students;