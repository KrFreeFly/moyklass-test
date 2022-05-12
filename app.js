const express = require('express');
const getLessons = require('./src/controllers/getLessons');
const createLessons = require('./src/controllers/createLessons');
const dotenv = require('dotenv');
const HttpError = require('./src/errors/httpError');
const { getLessonsValidator, postLessonsValidator } = require('./src/validators/getLessons')

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', getLessonsValidator, async (req, res, next) => {
    try {
        const { date, status, teacherIds, studentsCount, page, lessonsPerPage } = req.query;
        const result = await getLessons({date, status, teacherIds, studentsCount, page, lessonsPerPage});

        return res.status(200).json(result);
    } catch (error) {
        return next(error)
    }
});

app.post('/lessons', postLessonsValidator, async (req, res, next) => {
    try {
        const { teacherIds, title, days, firstDate, lessonsCount, lastDate } = req.body;
        const result = await createLessons(teacherIds, title, days, firstDate, lessonsCount, lastDate);

        res.status(200).json(result);
    } catch (error) {
        return next(error);
    }
});

app.use((req, res) => {
    return res.status(404).json({
        description: 'Page not found',
    });
});

app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.status).json({...err, message: err.message});
    }
    console.log('Internal server error', err);

    return res.status(500).json({
        message: 'INTERNAL_SERVER_ERROR',
    });
});

const port = +process.env.PORT;
const host = process.env.HOST;

app.listen(port, host, () => {
    console.log(`Server start on ${host}:${port}`);
});

module.exports = app;
