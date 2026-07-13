const fs = require("fs");
const path = require("path");

const batchesFile = path.join(__dirname, "../data/batches.json");

const getBatches = () => {
  const data = fs.readFileSync(batchesFile, "utf8");
  return JSON.parse(data);
};

const saveBatches = (batches) => {
  fs.writeFileSync(
    batchesFile,
    JSON.stringify(batches, null, 2)
  );
};

// Get all batches
const getAllBatches = (req, res) => {
  res.json({
    success: true,
    batches: getBatches(),
  });
};

// Create batch
const createBatch = (req, res) => {
  const { name } = req.body;

  const batches = getBatches();

  const exists = batches.find(
    (b) =>
      b.name.toLowerCase() ===
      name.toLowerCase()
  );

  if (exists) {
    return res.status(400).json({
      success: false,
      message: "Batch already exists",
    });
  }

  const newBatch = {
    id: Date.now(),
    name,
  };

  batches.push(newBatch);

  saveBatches(batches);

  res.status(201).json({
    success: true,
    message: "Batch Added Successfully",
    batch: newBatch,
  });
};

// Delete batch
const deleteBatch = (req, res) => {
  const id = Number(req.params.id);

  let batches = getBatches();

  batches = batches.filter(
    (batch) => batch.id !== id
  );

  saveBatches(batches);

  res.json({
    success: true,
    message: "Batch Deleted",
  });
};

module.exports = {
  getAllBatches,
  createBatch,
  deleteBatch,
};