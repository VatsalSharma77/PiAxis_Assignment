const { searchDetailsModel } = require("../models/detailModel");

module.exports.validateSearchDetails = async (req, res, next) => {
  const errorExists = searchDetailsModel.validate(req.query);

  if (errorExists.error) {
    return res.status(400).json({
      statuscode: 400,
      status: "param-validation-error",
      data: {},
      error: [
        {
          message: errorExists.error.details[0].message,
          errorcode: 400,
        },
      ],
    });
  }

  next();
};
