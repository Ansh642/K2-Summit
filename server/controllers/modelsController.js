const pool = require("../config/db");

// Get all models
exports.getAllModels = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM models");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching models" });
  }
};

// Get a specific model by ID
exports.getModelById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM models WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Model not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error fetching model" });
  }
};

// Get all columns of a model
exports.getColumnsByModel = async (req, res) => {
  try {
    const { modelId } = req.params;
    const result = await pool.query("SELECT * FROM columns WHERE model_id = $1", [modelId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Error fetching columns" });
  }
};
