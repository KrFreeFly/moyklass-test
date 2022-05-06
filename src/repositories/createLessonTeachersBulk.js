const { LessonTeachers } = require('../models');

const createLessonTeachersBulk = async(lessonTeachers) => {
    const result = await LessonTeachers.bulkCreate(lessonTeachers);

    return result.map((u) => u.get({ plain: true }));
};

module.exports = createLessonTeachersBulk;