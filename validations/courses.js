const Joi = require('joi');

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().required().min(3)
    });

    return schema.validate(course);
}

module.exports = validateCourse;
