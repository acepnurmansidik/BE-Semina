const express = require("express");
const { signinCms } = require("./controller");
const router = express.Router();

router.post("/auth/signin", signinCms);

module.exports = router;
