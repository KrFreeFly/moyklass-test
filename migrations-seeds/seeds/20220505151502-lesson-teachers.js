'use strict';

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('lesson_teachers', [
            {
                lesson_id: '1',
                teacher_id: '1',
            },
            {
                lesson_id: '1',
                teacher_id: '3',
            },
            {
                lesson_id: '2',
                teacher_id: '1',
            },
            {
                lesson_id: '2',
                teacher_id: '4',
            },
            {
                lesson_id: '3',
                teacher_id: '3',
            },
            {
                lesson_id: '4',
                teacher_id: '4',
            },
            {
                lesson_id: '6',
                teacher_id: '3',
            },
            {
                lesson_id: '7',
                teacher_id: '1',
            },
            {
                lesson_id: '8',
                teacher_id: '4',
            },
            {
                lesson_id: '8',
                teacher_id: '3',
            },
            {
                lesson_id: '8',
                teacher_id: '2',
            },
            {
                lesson_id: '9',
                teacher_id: '3',
            },
            {
                lesson_id: '10',
                teacher_id: '3',
            },
        ]);
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('lesson_teachers', {});
    }
};