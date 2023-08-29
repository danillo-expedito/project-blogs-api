const validateUserFields = (email, password) => email && password;
const Joi = require('joi');

const validateNewUser = (body) => 
    Joi.object({
    displayName: Joi.string().min(8).required().messages({
        'string.min': '"displayName" length must be at least 8 characters long',
    }),
    email: Joi.string().email().required().messages({
        'string.email': '"email" must be a valid email',
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': '"password" length must be at least 6 characters long',
    }),
    image: Joi.string(),
  }).validate(body);

const defaultMessage = 'Some required fields are missing';

const validatePostFields = (body) => 
    Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().required(),
    }).error(new Error(defaultMessage)).validate(body);

const validatePutFields = (body) => 
    Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    }).error(new Error(defaultMessage)).validate(body);

module.exports = {
    validateUserFields,
    validateNewUser,
    validatePostFields,
    validatePutFields,
};