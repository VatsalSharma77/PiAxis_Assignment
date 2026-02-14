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
    const { q } = req.query;

    const searchTerm = q || "";

    const result = await pool.query(
      "SELECT * FROM public.search_details_function($1);",
      [searchTerm]
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

exports.suggestDetail = async (req, res) => {
  try {
    const { host_element, adjacent_element, exposure } = req.body;

    const result = await pool.query(
      "SELECT * FROM public.suggest_detail_function($1, $2, $3);",
      [host_element, adjacent_element, exposure]
    );

     if (result.rows.length === 0) {
      return res.status(200).json({
        statuscode: 200,
        status: "success",
        data: {
          message: "No matching detail found for the provided context",
          suggestion: null
        },
        error: [],
      });
    }

    res.status(200).json({
      statuscode: 200,
      status: "success",
      data: result.rows[0],
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

