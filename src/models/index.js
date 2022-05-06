const Lessons = require('./lessons');
const Students = require('./students');
const Teachers = require('./teachers');
const LessonStudents = require('./lesson_students');
const LessonTeachers = require('./lesson_teachers');

Students.belongsToMany(Lessons, { as: 'lessons', through: LessonStudents, foreignKey: 'studentId' });
Lessons.belongsToMany(Students, { as: 'students', through: LessonStudents, foreignKey: 'lessonId' });

Teachers.belongsToMany(Lessons, { as: 'lessons', through: LessonTeachers, foreignKey: 'teacherId' });
Lessons.belongsToMany(Teachers, { as: 'teachers', through: LessonTeachers, foreignKey: 'lessonId' });

Students.hasMany(LessonStudents, { foreignKey: 'studentId' });
LessonStudents.belongsTo(Students);

module.exports = {
    Lessons,
    LessonStudents,
    LessonTeachers,
    Students,
    Teachers,
}