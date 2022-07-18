const express = require("express");
const { index, destroy, find, update, create } = require("./controller");
const router = express.Router();

router.get("/talents", index);
router.get("/talents/:id", find);
router.put("/talents/:id", update);
router.delete("/talents/:id", destroy);
router.post("/talents", create);

module.exports = router;
