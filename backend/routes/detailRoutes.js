const express = require("express");
const router = express.Router();

const { getDetails, searchDetails } = require("../controllers/detailController");
const { validateSearchDetails } = require("../middleware/detailMiddleware");

router.get("/details", getDetails);
router.get("/search", validateSearchDetails, searchDetails);


module.exports = router;
