const selectTeachersByIds = require('../repositories/selectTeachersById');
const HttpError = require('../errors/httpError');
const { createLessonsBulk, createLessonTeachersBulk } = require('../repositories')
const { createArrayOfLessons } = require('../helpers/utils');

const createLessons = async (teacherIds, title, days, firstDate, lessonsCount, lastDate) => {
    const teachers = await selectTeachersByIds(teacherIds);

    if (!teachers) {
        throw new HttpError(404, 'Teachers not found');
    }
    const foundTeacherIds = teachers.map((teacher) => {
        return teacher.id;
    })

    if (days.find((day) => {
        if (+day > 6) return true
    })) {
        throw new HttpError(400, 'Only values from 0 to 6 accepted in "days" array');
    }

    const lessons = createArrayOfLessons(title, days, firstDate, lessonsCount, lastDate);
    const createdLessons = await createLessonsBulk(lessons);

    const lessonTeachers = createdLessons.reduce((acc, lesson) => {
        foundTeacherIds.forEach((teacher) => {
            acc.push({
                teacherId: teacher,
                lessonId: lesson.id,
            })
        })

        return acc;
    }, []);

    await createLessonTeachersBulk(lessonTeachers);

    return createdLessons;

}

module.exports = createLessons;