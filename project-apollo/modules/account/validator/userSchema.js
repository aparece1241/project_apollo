const joi = require('joi');

const UserSchema = joi.object().keys({
    firstname: joi.string().min(3).required(),
    lastname: joi.string().min(3).required(),
    username: joi.string().min(5).max(100).required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(8).required(),
    position: joi.string().valid("admin", "customer", "seller")
});

module.exports = UserSchema;