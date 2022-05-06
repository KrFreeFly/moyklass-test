const { selectLessonsByTeachers, selectLessonsByStudentsCount } = require('../repositories');
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

const setCurrentDateToClosestDay = (currentDate, days) => {
    const currentDayOfWeek = currentDate.getDay();
    let closestDayOfWeek = days.find((day) => {
        return day >= currentDayOfWeek;
    })
    if (closestDayOfWeek === undefined) {
        currentDate.setDate(currentDate.getDate() + (7 - currentDayOfWeek + days[0]));
    } else {
        currentDate.setDate(currentDate.getDate() + (closestDayOfWeek - currentDayOfWeek));
    }

    return currentDate;
}

const createArrayOfLessons = (title, days, firstDate, lessonsCount, lastDate) => {
    days.sort();
    let lessons = [];
    const startDate = new Date(firstDate);
    let currentDate = new Date(firstDate);
    if (lessonsCount) {
        for (; lessonsCount > 0; lessonsCount--) {
            if (((currentDate - startDate) / (1000 * 60 * 60 * 24)) >= 365) break;
            currentDate = setCurrentDateToClosestDay(currentDate, days);
            lessons.push({
                date: new Date(currentDate),
                title: title
            });
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return lessons;
    }

    if (lastDate) {
        const finishDate = new Date(lastDate);
        let lessonsCreated = 0;
        for (; currentDate < finishDate; currentDate.setDate(currentDate.getDate() + 1)) {
            if (lessonsCreated === 300) break
            currentDate = setCurrentDateToClosestDay(currentDate, days);
            if (currentDate > finishDate) break
            lessons.push({
                date: new Date(currentDate),
                title: title
            });
            lessonsCreated++;
        }
        return lessons;
    }
};


module.exports = {
    filterLessonsByStudentsCount,
    filterLessonsByTeachersIds,
    filterLessonsByStudentsAndTeachers,
    createArrayOfLessons,
}