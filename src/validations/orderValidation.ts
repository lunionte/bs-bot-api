import { Joi } from "celebrate";

export const newOrderValidation = Joi.object().keys({
    botType: Joi.string().max(40).trim().required(),
    timeInDays: Joi.number().required(),
    additionals: Joi.string().max(40).trim().required(),
});

export const newRenewValidation = Joi.object().keys({
    timeInDays: Joi.number().required(),
});
