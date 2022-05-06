'use strict';

module.exports = {
    up: async (queryInterface) => {
        return queryInterface.bulkInsert('lessons', [
            {
                date: '2019-09-01',
                title: 'Green Color',
                status: 1,
            },
            {
                date: '2019-09-02',
                title: 'Red Color',
                status: 0,
            },
            {
                date: '2019-09-03',
                title: 'Orange Color',
                status: 1,
            },
            {
                date: '2019-09-04',
                title: 'Blue Color',
                status: 1,
            },
            {
                date: '2019-05-10',
                title: 'Purple Color',
                status: 0,
            },
            {
                date: '2019-05-15',
                title: 'Red Color',
                status: 1,
            },
            {
                date: '2019-06-17',
                title: 'White Color',
                status: 0,
            },
            {
                date: '2019-06-17',
                title: 'Black Color',
                status: 1,
            },
            {
                date: '2019-06-20',
                title: 'Yellow Color',
                status: 1,
            },
            {
                date: '2019-06-24',
                title: 'Brown Color',
                status: 0,
            },
        ]);
    },

    down: async (queryInterface) => {
        return queryInterface.bulkDelete('lessons', {});
    }
};