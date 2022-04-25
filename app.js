const express = require('express');
const getLessons = require('./controllers/getLessons');
const dotenv = require('dotenv');
const HttpError = require('./errors/httpError');

dotenv.config();

const app = express();

app.get('/', async (req, res, next) => {
    try {
        const { date, status, teacherIds, studentsCount, page, lessonsPerPage } = req.query;
        const result = await getLessons({ date, status, teacherIds, studentsCount, page, lessonsPerPage });

        return res.status(200).json(result);
    } catch (error) {
        return next(error)
    }
});

app.post('/lessons', (req, res) => {
    res.status(200).send('Not implemented yet');
});

app.use((req, res) => {
    return res.status(404).json({
        description: 'Page not found',
    });
});

app.use((err, req, res, next) => {
    if (err instanceof HttpError) {
        return res.status(err.status).json({ ...err, message: err.message });
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
