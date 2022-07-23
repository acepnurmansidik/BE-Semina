const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const { create, index, findDetail, update, destroy } = require("./controller");

router.get("/categories", authenticateUser, authorizeRoles("organizer"), index);
router.get(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  findDetail
);
router.post(
  "/categories",
  authenticateUser,
  authorizeRoles("organizer"),
  create
);
router.put(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/categories/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  destroy
);

module.exports = router;
