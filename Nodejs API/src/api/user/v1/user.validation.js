// joi validations come hear
const Joi = require('@hapi/joi');
const PasswordComplexity = require('joi-password-complexity')

const userSchema = Joi.object().keys({
    first_name: Joi.string().alphanum().min(2).max(10).trim().required().messages({
        'string.base': `"first_name" should be a type of 'alphanum'`,
        'string.empty': `"first_name" cannot be an empty field`,
        'string.length': `"first_name" length must be min 2 max 10 characters long`,
        'any.required': `"first_name" is a required field`
    }),  
    last_name: Joi.string().alphanum().min(1).max(10).trim().required().messages({
        'string.base': `"last_name" should be a type of 'alphanum'`,
        'string.empty': `"last_name" cannot be an empty field`,
        'any.required': `"last_name" is a required field`
    }),
    role_id: Joi.string().alphanum().length(24).trim().required().messages({
        'string.base': `"role_id" should be a type of 'text'`,
        'string.empty': `"role_id" cannot be an empty field`,
        'any.required': `"role_id" is a required field`
    }),
    email: Joi.string().email().required().messages({
        'string.base': `"emailId" should be a type of "text"`,
        'string.empty': `"emailId" cannot be an empty field`,
        'string.required': `"emailId" is a required field`,
        'string.email': `"emailId" must be a valid email`
    }),
    password: PasswordComplexity({
        min:8,
        max:25,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
    }).required(),
});

const roleSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(2).max(10).trim().required().messages({
        'string.base': `"name" should be a type of 'alphanum'`,
        'string.empty': `"name" cannot be an empty field`,
        'string.length': `"name" length must be min 2 max 10 characters long`,
    }),  
});

const loginSchema = Joi.object().keys({
    email: Joi.string().email().required().messages({
        'string.base': `"emailId" should be a type of "text"`,
        'string.empty': `"emailId" cannot be an empty field`,
        'string.required': `"emailId" is a required field`,
        'string.email': `"emailId" must be a valid email`
    }),
    password: Joi.string().min(2).max(16).trim().required().messages({
        'string.base': `"password" should be a type of 'string'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.length': `"password" length must be min 2 max 16 characters long`, 
    }) 
});

const validateUserSchema = async (dataToValidate) => {
    return await userSchema.validate(dataToValidate, { abortEarly: false });
}

const validateRoleSchema = async (dataToValidate) => {
    return await roleSchema.validate(dataToValidate, { abortEarly: false });
}

const validateLoginSchema = async (dataToValidate) => {
    return await loginSchema.validate(dataToValidate, { abortEarly: false });
}


module.exports = {
    validateUserSchema,
    validateRoleSchema,
    validateLoginSchema
}