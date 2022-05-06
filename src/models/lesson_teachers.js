const { DataTypes } = require('sequelize');
const sequelize = require('../init/db');
const Lessons = require('./lessons');
const Teachers = require('./students');

const LessonTeachers = sequelize.define(
    'LessonTeachers',
    {
        lessonId: {
            type: DataTypes.INTEGER,
            field: 'lesson_id',
            references: {
                model: Lessons,
                key: 'id',
            },
        },
        teacherId: {
            type: DataTypes.INTEGER,
            field: 'teacher_id',
            references: {
                model: Teachers,
                key: 'id',
            },
        },
    },
    {
        tableName: 'lesson_teachers',
        timestamps: false,
    },
);

LessonTeachers.removeAttribute('id');

module.exports = LessonTeachers;