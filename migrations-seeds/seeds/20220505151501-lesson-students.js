'use strict';

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('lesson_students', [
            {
                lesson_id: '1',
                student_id: '1',
                visit: true,
            },
            {
                lesson_id: '1',
                student_id: '2',
                visit: true,
            },
            {
                lesson_id: '1',
                student_id: '3',
                visit: false,
            },
            {
                lesson_id: '2',
                student_id: '2',
                visit: true,
            },
            {
                lesson_id: '2',
                student_id: '3',
                visit: true,
            },
            {
                lesson_id: '4',
                student_id: '1',
                visit: true,
            },
            {
                lesson_id: '4',
                student_id: '2',
                visit: true,
            },
            {
                lesson_id: '4',
                student_id: '3',
                visit: true,
            },
            {
                lesson_id: '4',
                student_id: '4',
                visit: true,
            },
            {
                lesson_id: '5',
                student_id: '4',
                visit: false,
            },
            {
                lesson_id: '5',
                student_id: '2',
                visit: false,
            },
            {
                lesson_id: '6',
                student_id: '1',
                visit: false,
            },
            {
                lesson_id: '6',
                student_id: '3',
                visit: false,
            },
            {
                lesson_id: '7',
                student_id: '2',
                visit: true,
            },
            {
                lesson_id: '7',
                student_id: '1',
                visit: true,
            },
            {
                lesson_id: '8',
                student_id: '1',
                visit: false,
            },
            {
                lesson_id: '8',
                student_id: '4',
                visit: true,
            },
            {
                lesson_id: '8',
                student_id: '2',
                visit: true,
            },
            {
                lesson_id: '9',
                student_id: '2',
                visit: false,
            },
            {
                lesson_id: '10',
                student_id: '1',
                visit: false,
            },
            {
                lesson_id: '10',
                student_id: '3',
                visit: true,
            },
        ]);
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('lesson_students', {});
    }
};