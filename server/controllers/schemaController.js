const pool = require("../config/db");

// Fetch metadata for a specific schema (helper function)
const fetchSchemaMetadata = async (schema) => {
  try {
    const tablesQuery = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = $1;
    `;
    const tablesResult = await pool.query(tablesQuery, [schema]);

    const tablesWithMetadata = await Promise.all(
      tablesResult.rows.map(async (table) => {
        const columnsQuery = `
          SELECT column_name, data_type 
          FROM information_schema.columns 
          WHERE table_schema = $1 AND table_name = $2;
        `;
        const columnsResult = await pool.query(columnsQuery, [schema, table.table_name]);

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
        const fkResult = await pool.query(fkQuery, [schema, table.table_name]);

        return {
          table_name: table.table_name,
          columns: columnsResult.rows,
          foreign_keys: fkResult.rows,
        };
      })
    );

    return tablesWithMetadata;
  } catch (error) {
    console.error(`Error fetching metadata for schema ${schema}:`, error);
    throw error;
  }
};


// Create a unified schema
exports.createUnifiedSchema = async (req, res) => {
  try {
    const schemas = ["customers_schema", "orders_schema", "revenue_schema"];
    const unifiedSchema = {};

    for (const schema of schemas) {
      unifiedSchema[schema] = await fetchSchemaMetadata(schema);
    }

    // Save the unified schema to the database
    const saveQuery = `
      INSERT INTO unified_schema.metadata (schema_name, metadata)
      VALUES ($1, $2)
      ON CONFLICT (schema_name) DO UPDATE SET metadata = $2;
    `;
    await pool.query(saveQuery, ["unified_schema", JSON.stringify(unifiedSchema)]);

    res.json({ message: "Unified schema created successfully!", unifiedSchema });
  } catch (error) {
    console.error("Error creating unified schema:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Fetch the unified schema
exports.getUnifiedSchema = async (req, res) => {
  try {
    const query = `
      SELECT schema_name, table_name, columns, foreign_keys
      FROM unified_schema.metadata;
    `;
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No unified schema data found." });
    }

    // Group data by schema_name
    const unifiedSchema = {};
    result.rows.forEach((row) => {
      if (!unifiedSchema[row.schema_name]) {
        unifiedSchema[row.schema_name] = [];
      }
      unifiedSchema[row.schema_name].push({
        table_name: row.table_name,
        columns: row.columns,
        foreign_keys: row.foreign_keys,
      });
    });

    res.json(unifiedSchema);
  } catch (error) {
    console.error("Error fetching unified schema:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Existing functions (getSchemas, getTables, getColumns, getTableData)
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


