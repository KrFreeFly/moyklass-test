const selectTeachersByIds = require('../repositories/selectTeachersById');
const { createLessonsBulk, createLessonTeachersBulk } = require('../repositories')
const { createArrayOfLessons } = require('../helpers/utils');

const createLessons = async (teacherIds, title, days, firstDate, lessonsCount, lastDate) => {

    const lessons = createArrayOfLessons(title, days, firstDate, lessonsCount, lastDate);
    const createdLessons = await createLessonsBulk(lessons);

    const teachers = await selectTeachersByIds(teacherIds);

    if (teachers) {
        const foundTeacherIds = teachers.map((teacher) => {
            return teacher.id;
        })

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
    }

    return createdLessons;

}

module.exports = createLessons;