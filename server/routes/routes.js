const express = require("express");
const router = express.Router();
const schemaController = require("../controllers/schemaController");
const run = require('../geminiApi');

// Existing routes
router.get("/schemas", schemaController.getSchemas);
router.get("/schemas/:schema/tables", schemaController.getTables);
router.get("/schemas/:schema/tables/:table/columns", schemaController.getColumns);
router.get("/schemas/:schema/tables/:table/data", schemaController.getTableData);

// New routes for unified schema
router.post("/create-unified-schema", schemaController.createUnifiedSchema);
router.get("/unified-schema", schemaController.getUnifiedSchema);

router.post('/ask-ai', async(req, res) => {
    try{
      const {prompt} = req.body;
      const response = await run(prompt);
  
      return res.status(200).json({
        data : response
      });
  
    }
    catch(err){
      return res.status(500).json({
        success: false,
        error: err.message
      })
    }
  
  });


module.exports = router;