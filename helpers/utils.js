const { selectLessonsByTeachers, selectLessonsByStudentsCount } = require('../repositories/index');
const HttpError = require('../errors/httpError');

const filterLessonsByStudentsCount = async(studentsCount) => {
    const countArray = studentsCount.split(',');
    let having = '';
    if (countArray[2]) {
        throw new HttpError(400, 'Too many numbers in studentsCount');
    } else if (countArray[1]) {
        having = `between ${countArray[0]} and ${countArray[1]}`;
    } else {
        having = `= ${countArray[0]}`;
    }
    const lessonsByStudent = await selectLessonsByStudentsCount(having);
    return lessonsByStudent.reduce((acc, lesson) => {
        acc.push(lesson.lessonId);

        return acc;
    }, []);
};

const filterLessonsByTeachersIds = async(teacherIds) => {
    const teachers = teacherIds.split(',');
    const lessonsByTeacher = await selectLessonsByTeachers(teachers);
    return lessonsByTeacher.reduce((acc, lesson) => {
        acc.push(lesson.lessonId);

        return acc;
    }, []);
}

const filterLessonsByStudentsAndTeachers = (lessonsFilteredByStudents, lessonsFilteredByTeachers) => {
    const lessonsMap = lessonsFilteredByTeachers.reduce((acc, lesson, index) => {
        acc[lesson] = index;

        return acc;
    }, {});

    return lessonsFilteredByStudents.reduce((acc, lesson) => {
        if (lessonsMap[lesson]) acc.push(lesson);

        return acc;
    }, []);
}

module.exports = {
    filterLessonsByStudentsCount,
    filterLessonsByTeachersIds,
    filterLessonsByStudentsAndTeachers,
}