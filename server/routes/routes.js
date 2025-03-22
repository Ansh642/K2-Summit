const express = require("express");
const router = express.Router();
const schemaController = require("../controllers/schemaController");

router.get("/schemas", schemaController.getSchemas);
router.get("/schemas/:schema/tables", schemaController.getTables);
router.get("/schemas/:schema/tables/:table/columns", schemaController.getColumns);
router.get("/schemas/:schema/tables/:table/data", schemaController.getTableData); // New route

module.exports = router;
