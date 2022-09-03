const express = require("express");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const router = express.Router();
const {
  createCMSUser,
  getCMSUsers,
  getAllCMSOrganizers,
  getOneCMSUser,
  updateCMSUser,
  deleteCMSUser,
} = require("./controller");

router.get(
  "/users",
  authenticateUser,
  authorizeRoles("owner", "organizer"),
  getCMSUsers
);

router.post(
  "/users",
  authenticateUser,
  authorizeRoles("organizer"),
  createCMSUser
);

router.get(
  "/users/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  getOneCMSUser
);

router.get(
  "/organizers",
  authenticateUser,
  authorizeRoles("owner"),
  getAllCMSOrganizers
);

router.put(
  "/users/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  updateCMSUser
);

router.delete(
  "/users/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  deleteCMSUser
);

module.exports = router;
