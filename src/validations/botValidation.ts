import { Joi } from "celebrate";

export const changeBotToken = Joi.object().keys({
    newBotToken: Joi.string().max(40).trim().required(),
});

export const changeBotName = Joi.object().keys({
    newName: Joi.string().max(40).trim().required(),
});

export const changeBotOwner = Joi.object().keys({
    newOwnerId: Joi.string().max(40).trim().required(),
});
