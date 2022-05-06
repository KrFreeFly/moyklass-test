const { DataTypes } = require('sequelize');
const sequelize = require('../init/db');
const Lessons = require('./lessons');
const Students = require('./students');

const LessonStudents = sequelize.define(
    'LessonStudents',
    {
        lessonId: {
            type: DataTypes.INTEGER,
            field: 'lesson_id',
            references: {
                model: Lessons,
                key: 'id',
            },
        },
        studentId: {
            type: DataTypes.INTEGER,
            field: 'student_id',
            references: {
                model: Students,
                key: 'id',
            },
        },
        visit: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: 'lesson_students',
        timestamps: false,
    },
);

LessonStudents.removeAttribute('id');

module.exports = LessonStudents;