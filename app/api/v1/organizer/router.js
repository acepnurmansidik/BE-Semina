const express = require("express");
const { authenticateUser } = require("../../../middlewares/auth");
const router = express.Router();
const { createCMSOrganizer, createCMUser } = require("./controller");

router.post("/organizers", authenticateUser, createCMSOrganizer);
router.post("/admin", authenticateUser, createCMUser);

module.exports = router;
