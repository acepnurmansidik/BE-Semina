const express = require("express");
const {
  index,
  create,
  find,
  update,
  destroy,
  updateStatus,
} = require("./controller");
const router = express.Router();

router.get("/events", index);
router.get("/events/:id", find);
router.post("/events", create);
router.put("/events/:id", update);
router.delete("/events/:id", destroy);
router.put("/events/:id/:status", updateStatus);

module.exports = router;