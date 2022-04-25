const { DataTypes } = require('sequelize');
const sequelize = require('../init/db');

const Lessons = sequelize.define(
    'Lessons',
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        date: {
            allowNull: false,
            type: DataTypes.DATEONLY,
        },
        title: {
            type: DataTypes.STRING(100),
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
    },
    {
        tableName: 'lessons',
        timestamps: false,
    },
);

module.exports = Lessons;