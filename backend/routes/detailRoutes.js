const express = require("express");
const router = express.Router();

const { getDetails } = require("../controllers/detailController");

router.get("/details", getDetails);

module.exports = router;
