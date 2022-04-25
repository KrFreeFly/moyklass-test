const selectWithStudentsAndTeachers = require('./selectWithStudentsAndTeachers');
const selectLessonsByTeachers = require('./selectLessonsByTeachers');
const selectLessonsByStudentsCount = require('./selectLessonsByStudentsCount');

module.exports = {
    selectLessonsByTeachers,
    selectWithStudentsAndTeachers,
    selectLessonsByStudentsCount,
}