const express = require("express");
const router = express.Router();

const { getDetails, searchDetails, suggestDetail } = require("../controllers/detailController");
const { validateSearchDetails, validateSuggestDetail } = require("../middleware/detailMiddleware");

router.get("/details", getDetails);
router.get("/details/search", validateSearchDetails, searchDetails);
router.post("/suggest-detail", validateSuggestDetail, suggestDetail);


module.exports = router;
