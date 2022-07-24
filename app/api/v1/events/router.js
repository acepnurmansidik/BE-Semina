const express = require("express");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../../middlewares/auth");
const {
  index,
  create,
  find,
  update,
  destroy,
  updateStatus,
} = require("./controller");
const router = express.Router();

router.get("/events", authenticateUser, authorizeRoles("organizer"), index);
router.get("/events/:id", authenticateUser, authorizeRoles("organizer"), find);
router.post("/events", authenticateUser, authorizeRoles("organizer"), create);
router.put(
  "/events/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  update
);
router.delete(
  "/events/:id",
  authenticateUser,
  authorizeRoles("organizer"),
  destroy
);
router.put(
  "/events/:id/status",
  authenticateUser,
  authorizeRoles("organizer"),
  updateStatus
);

module.exports = router;
