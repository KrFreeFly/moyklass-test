const { Teachers } = require('../models');

const selectTeachersByIds = async (teacherIds) => {
    const teachers = await Teachers.findAll({
        where: {
            id: teacherIds
        },
    })

    return teachers.map((u) => u.get({ plain: true }));
};

module.exports = selectTeachersByIds;
