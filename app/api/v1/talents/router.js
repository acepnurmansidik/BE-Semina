const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const { index, destroy, find, update, create } = require("./controller");

router.get("/talents", authenticateUser, authorizeRoles("organizer"), index);
router.get("/talents/:id", authenticateUser, authorizeRoles("organizer"), find);
router.put(
  "/talents/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/talents/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  destroy
);
router.post("/talents", authenticateUser, authorizeRoles("organizer"), create);

module.exports = router;
