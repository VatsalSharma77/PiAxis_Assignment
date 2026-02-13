const { searchDetailsModel } = require("../models/detailModel");

module.exports = {
  validateSearchDetails: async (req, res, next) => {
    if (req.body) {
      const errorExists = searchDetailsModel.validate(req.body);

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
    } else {
      res.status(500).json({
        statuscode: 500,
        status: "failed",
        data: {},
        error: [{ message: "Invalid Params.", errorcode: 500 }],
      });
    }
  },
};
