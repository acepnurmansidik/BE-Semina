const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../../../middlewares/auth");
const { create, index, findDetail, update, destroy } = require("./controller");

router.get("/categories", authenticateUser, index);
router.get("/categories/:id", authenticateUser, findDetail);
router.post("/categories", authenticateUser, create);
router.put("/categories/:id", authenticateUser, update);
router.delete("/categories/:id", authenticateUser, destroy);

module.exports = router;
