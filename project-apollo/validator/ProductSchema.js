const joi = require('joi');

const productSchema = joi.object().keys({
    product_name: joi.string().min(1).max(100).required(),
    product_price: joi.number().min(0).required(),
    product_stock: joi.number().min(0).required(),
    product_category: joi.string().required()
});


module.exports = productSchema;