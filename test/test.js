const app = require('../app');
const request = require('supertest');

describe('GET lessons', () => {
    it('Should respond with status 200', (done) => {
        request(app)
            .get('/')
            .query({
                date: '2019-09-02',
                status: 0,
                teacherIds: '1,2,3,4',
                studentsCount: '1,3',
                page: 1,
                lessonsPerPage: 10,
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            });
    });
});

describe('POST new lessons', () => {
    it('Should respond with status 200', (done) => {
        request(app)
            .post('/lessons')
            .send({
                teacherIds: [1,2],
                title: 'Blue Ocean',
                days: [0],
                firstDate: '2022-05-08',
                lastDate: '2022-06-08',
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done();
            });
    });
});



