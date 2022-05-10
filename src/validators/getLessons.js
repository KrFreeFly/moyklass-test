const Joi = require('joi');
const HttpError = require('../errors/httpError');

const validate = (reqField, schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[reqField], { abortEarly: false });
        let errors = [];
        if (error) {
            errors = error.details.map((detail) => {
                return {
                    type: detail.type,
                    value: detail.context.value,
                    path: detail.path,
                }
            })
            throw new HttpError(400, 'Validation error', errors);
        }

        return next();
    }
}

const validateBody = (schema) => {
    return validate('body', schema);
};

const validateQuery = (schema) => {
    return validate('query', schema);
};

const getLessonsValidator = validateQuery(Joi.object({
    date: Joi.string().pattern(/^\d{4}-\d\d-\d\d(,\d{4}-\d\d-\d\d)?$/, {name: 'dates'}),
    status: Joi.number().integer().min(0).max(1),
    teacherIds: Joi.string().pattern(/^\d+(,\d+)*$/,{ name: 'teachers' }),
    studentsCount: Joi.string().pattern(/^\d+(,\d+)?$/,{ name: 'students' }),
    page: Joi.number().integer(),
    lessonsPerPage: Joi.number().integer(),
}));

const postLessonsValidator = validateBody(Joi.object({
    teacherIds: Joi.array().items(Joi.number().integer()),
    title: Joi.string(),
    days: Joi.array().items(Joi.number().integer().min(0).max(6)).required(),
    firstDate: Joi.date().iso().options({ convert: true }).required(),
    lessonsCount: Joi.number().integer(),
    lastDate: Joi.date().iso().options({ convert: true }),
}).xor('lessonsCount', 'lastDate'))

module.exports = {
    getLessonsValidator,
    postLessonsValidator,
};