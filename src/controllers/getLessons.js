const { selectWithStudentsAndTeachers } = require('../repositories');
const { Op } = require('sequelize');
const config = require('../config/general');
const { filterLessonsByStudentsCount, filterLessonsByTeachersIds, filterLessonsByStudentsAndTeachers } = require('../helpers/utils')

const getLessons = async ({
    date,
    status,
    teacherIds,
    studentsCount,
    page,
    lessonsPerPage,
}) => {
    const params = {};
    let lessonsFilteredByStudents = [];
    let lessonsFilteredByTeachers = [];

    if (status) params.status = status;

    if (date) {
        const lessonDate = date.split(',');
        if (lessonDate[1]) {
            params.date = {
                [Op.between]: lessonDate
            }
        } else {
            params.date = date;
        }
    }

    const limit = lessonsPerPage
        ? lessonsPerPage
        : config.defaultLessonsLimit;

    const offset = page
        ? (page - 1) * limit
        : (config.defaultLessonsPage - 1) * limit;

    if (studentsCount) {
        lessonsFilteredByStudents = await filterLessonsByStudentsCount(studentsCount);
        params.id = lessonsFilteredByStudents;
    }

    if (teacherIds) {
        lessonsFilteredByTeachers = await filterLessonsByTeachersIds(teacherIds);
        params.id = lessonsFilteredByTeachers;
    }

    if (teacherIds && studentsCount) {
        params.id = filterLessonsByStudentsAndTeachers(lessonsFilteredByStudents, lessonsFilteredByTeachers);
    }

    const lessons = await selectWithStudentsAndTeachers(params, limit, offset);

    return lessons.map((lesson) => {
        lesson.visitCount = +lesson.visitCount;
        lesson.students = lesson.students.reduce((acc, student) => {
            acc.push({
                id: student.id,
                name: student.name,
                visit: student.LessonStudents.visit,
            });

            return acc
        }, []);

        return lesson
    });
};

module.exports = getLessons;