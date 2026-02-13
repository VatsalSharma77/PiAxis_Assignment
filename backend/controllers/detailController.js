const pool = require("../config/db");

exports.getDetails = async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM public.get_all_details_function();"
    );

    res.status(200).json({
      statuscode: 200,
      status: "success",
      data: result.rows,
      error: [{ message: "", errorcode: "" }],
    });

  } catch (err) {
    res.status(500).json({
      statuscode: 500,
      status: "Failed",
      data: {},
      error: [{ message: err.message, errorcode: 500 }],
    });
  }
};

exports.searchDetails = async (req, res) => {
  try {
    const { search_text } = req.body;

    const result = await pool.query(
      "SELECT * FROM public.search_details_function($1);",
      [search_text]
    );

    res.status(200).json({
      statuscode: 200,
      status: "success",
      data: result.rows,
      error: [{ message: "", errorcode: "" }],
    });

  } catch (err) {
    res.status(500).json({
      statuscode: 500,
      status: "Failed",
      data: {},
      error: [{ message: err.message, errorcode: 500 }],
    });
  }
};
