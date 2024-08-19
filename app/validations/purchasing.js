const Joi = require('joi');
const InvalidData = require('../exceptions/invalidData');


async function purchaseItem(req, _, next) {
    const schema = Joi.object({
        userId: Joi.number().required(),
        itemId: Joi.number().required(),
        qty: Joi.number().min(1).required(),


    });
    const { error } = schema.validate(req.body);

    if (error) throw new InvalidData(error.details[0].message)


    return next();
}


module.exports = {
    purchaseItem
}