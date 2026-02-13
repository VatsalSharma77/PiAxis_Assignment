const joi = require("@hapi/joi");

const searchDetailsModel = joi.object({
  q: joi.string().allow("", null),
});
const suggestDetailModel = joi.object({
  host_element: joi.string().required(),
  adjacent_element: joi.string().required(),
  exposure: joi.string().required(),
});

module.exports = {
  searchDetailsModel,
  suggestDetailModel
};
