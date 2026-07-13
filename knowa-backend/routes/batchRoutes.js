const express = require("express");

const router = express.Router();

const {
  getAllBatches,
  createBatch,
  deleteBatch,
} = require("../controllers/batchController");

router.get("/", getAllBatches);

router.post("/create", createBatch);

router.delete("/:id", deleteBatch);

module.exports = router;