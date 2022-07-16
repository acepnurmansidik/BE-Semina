const express = require("express");
const router = express.Router();
const { create, index, findDetail, update, destroy } = require("./controller");

router.post("/categories", create);
router.get("/categories", index);
router.get("/categories/:id", findDetail);
router.put("/categories/:id", update);
router.delete("/categories/:id", destroy);

module.exports = router;
