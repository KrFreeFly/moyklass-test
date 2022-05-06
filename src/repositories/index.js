const selectWithStudentsAndTeachers = require('./selectWithStudentsAndTeachers');
const selectLessonsByTeachers = require('./selectLessonsByTeachers');
const selectLessonsByStudentsCount = require('./selectLessonsByStudentsCount');
const createLessonsBulk = require('./createLessonsBulk');
const createLessonTeachersBulk = require('./createLessonTeachersBulk');

module.exports = {
    selectLessonsByTeachers,
    selectWithStudentsAndTeachers,
    selectLessonsByStudentsCount,
    createLessonsBulk,
    createLessonTeachersBulk,
}