import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const LighthouseSpec = {
  title: Joi.string().required(),
  towerHeight: Joi.number().allow("").optional(),
  lightHeight: Joi.number().allow("").optional(),
  character: Joi.string().allow("").optional(),
  daymark: Joi.string().allow("").optional(),
  range: Joi.number().allow("").optional(),
};

export const GroupSpec = {
  title: Joi.string().required(),
};
