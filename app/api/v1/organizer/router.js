const express = require("express");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express.Router();
const {
  createCMSOrganizer,
  createCMSUser,
  getCMSUsers,
} = require("./controller");

router.get("/users", authenticateUser, authorizeRoles("owner"), getCMSUsers);

router.post(
  "/organizers",
  authenticateUser,
  authorizeRoles("owner"),
  createCMSOrganizer
);

router.post(
  "/users",
  authenticateUser,
  authorizeRoles("organizer"),
  createCMSUser
);

module.exports = router;
