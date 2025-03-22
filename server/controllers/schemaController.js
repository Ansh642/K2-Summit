const pool = require("../config/db"); // Import DB connection

// Fetch all schemas
exports.getSchemas = async (req, res) => {
  try {
    const query = `
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('pg_catalog', 'information_schema', 'public');
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching schemas:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch tables for a specific schema, including foreign key relationships
exports.getTables = async (req, res) => {
  try {
    const { schema } = req.params;
    const query = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = $1;
    `;
    const tablesResult = await pool.query(query, [schema]);

    const tables = tablesResult.rows.map(row => row.table_name);
    let tablesWithRelations = [];

    for (let table of tables) {
      const fkQuery = `
        SELECT 
          kcu.column_name AS fk_column,
          ccu.table_schema AS referenced_schema,
          ccu.table_name AS referenced_table,
          ccu.column_name AS referenced_column
        FROM information_schema.key_column_usage kcu
        JOIN information_schema.constraint_column_usage ccu
          ON kcu.constraint_name = ccu.constraint_name
        WHERE kcu.table_schema = $1 AND kcu.table_name = $2;
      `;
      
      const fkResult = await pool.query(fkQuery, [schema, table]);
      tablesWithRelations.push({
        table_name: table,
        foreign_keys: fkResult.rows
      });
    }

    res.json(tablesWithRelations);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch columns for a specific table in a schema
exports.getColumns = async (req, res) => {
  try {
    const { schema, table } = req.params;
    const query = `
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_schema = $1 AND table_name = $2;
    `;
    const result = await pool.query(query, [schema, table]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching columns:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch entire table data for a specific table in a schema
exports.getTableData = async (req, res) => {
  try {
    const { schema, table } = req.params;
    const query = `SELECT * FROM ${schema}.${table} LIMIT 100;`; // Fetch first 100 rows
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching table data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};