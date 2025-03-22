const express = require("express");
const router = express.Router();
const schemaController = require("../controllers/schemaController");

// Existing routes
router.get("/schemas", schemaController.getSchemas);
router.get("/schemas/:schema/tables", schemaController.getTables);
router.get("/schemas/:schema/tables/:table/columns", schemaController.getColumns);
router.get("/schemas/:schema/tables/:table/data", schemaController.getTableData);

// New routes for unified schema
router.post("/create-unified-schema", schemaController.createUnifiedSchema);
router.get("/unified-schema", schemaController.getUnifiedSchema);

module.exports = router;