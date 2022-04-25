const sequelize = require("../init/db");
const { LessonTeachers } = require('../models');
const { Op } = require('sequelize');

const selectLessonsByTeachers = async (teachers) => {
    const rows = await LessonTeachers.findAll({
        where: {
            teacherId: {
                [Op.or]: teachers,
            }
        },
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('LessonTeachers.lesson_id')) ,'lessonId']
        ],
    });

    return rows.map((u) => u.get({ plain: true }));
};

module.exports = selectLessonsByTeachers;