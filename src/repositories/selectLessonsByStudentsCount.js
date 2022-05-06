const { LessonStudents } = require('../models');
const sequelize = require("../init/db");

const selectLessonsByStudentsCount = async (having) => {
    const rows = await LessonStudents.findAll({
        attributes: [
            'lessonId',
        ],
        group: [
            'lessonId',
        ],
        having: sequelize.literal(`COUNT(student_id) ${having}`),
    })

    return rows.map((u) => u.get({ plain: true }));
}

module.exports = selectLessonsByStudentsCount;