const { Lessons, Students, Teachers } = require('../models');
const sequelize = require('../init/db');

const selectWithStudentsAndTeachers = async (params, limit, offset) => {
    const rows = await Lessons.findAll({
        where: params,
        order: [
            ['id', 'ASC'],
        ],
        attributes: {
            include: [
                [
                    sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM lesson_students
                    WHERE
                        lesson_students.lesson_id = "Lessons".id
                        AND
                        lesson_students.visit = true
               )`),
                    'visitCount'
                ],
            ]
        },
        include: [
            {
                model: Students,
                as: 'students',
                through: {
                    attributes: ['visit'],
                },
            },
            {
                model: Teachers,
                as: 'teachers',
                through: {
                    attributes: [],
                },
            },
        ],
        limit,
        offset,
    });

    return rows.map((u) => u.get({ plain: true }));
}

module.exports = selectWithStudentsAndTeachers;