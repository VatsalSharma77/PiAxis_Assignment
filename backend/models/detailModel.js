const joi = require("@hapi/joi");

const searchDetailsModel = joi.object({
  q: joi.string().allow("", null),
});

module.exports = {
  searchDetailsModel,
};
