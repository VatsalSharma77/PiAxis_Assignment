const express = require("express");
const router = express.Router();

const { getDetails, searchDetails } = require("../controllers/detailController");
const { validateSearchDetails } = require("../middleware/detailMiddleware");

router.get("/details", getDetails);
router.post("/search-details", validateSearchDetails, searchDetails);


module.exports = router;
