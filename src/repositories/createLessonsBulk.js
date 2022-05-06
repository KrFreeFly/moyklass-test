const { Lessons } = require('../models');

const createLessonsBulk = async (lessons) => {

    const result = await Lessons.bulkCreate(lessons);

    return result.map((u) => u.get({ plain: true }));
}

module.exports = createLessonsBulk;