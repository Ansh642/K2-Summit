// src/data.jsx
const unifiedSchemaData = {
  customers_schema: {
    customers: {
      columns: [
        { column_name: "customer_id", data_type: "integer", is_primary_key: true },
        { column_name: "first_name", data_type: "text" },
        { column_name: "last_name", data_type: "text" },
        { column_name: "email", data_type: "text" },
        { column_name: "created_at", data_type: "timestamp" },
      ],
      foreign_keys: [], // No foreign keys for customers table
    },
  },
  orders_schema: {
    orders: {
      columns: [
        { column_name: "order_id", data_type: "integer", is_primary_key: true },
        { column_name: "customer_id", data_type: "integer" },
        { column_name: "order_date", data_type: "timestamp" },
        { column_name: "total_amount", data_type: "numeric" },
      ],
      foreign_keys: [
        {
          fk_column: "customer_id", // Foreign key column in orders table
          referenced_schema: "customers_schema", // Schema of the referenced table
          referenced_table: "customers", // Referenced table name
          referenced_column: "customer_id", // Referenced column name
        },
      ],
    },
  },
  revenue_schema: {
    revenue: {
      columns: [
        { column_name: "revenue_id", data_type: "integer", is_primary_key: true },
        { column_name: "order_id", data_type: "integer" },
        { column_name: "revenue_amount", data_type: "numeric" },
        { column_name: "recorded_at", data_type: "timestamp" },
      ],
      foreign_keys: [
        {
          fk_column: "order_id", // Foreign key column in revenue table
          referenced_schema: "orders_schema", // Schema of the referenced table
          referenced_table: "orders", // Referenced table name
          referenced_column: "order_id", // Referenced column name
        },
      ],
    },
  },
};

export default unifiedSchemaData;