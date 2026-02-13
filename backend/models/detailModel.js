const joi = require("@hapi/joi");

const searchDetailsModel = joi.object({
  search_text: joi.string().allow("", null),
});

module.exports = {
  searchDetailsModel,
};
