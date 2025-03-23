import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const SchemaExplorer = () => {
  const [schemas, setSchemas] = useState([]);
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchemas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/schemas");
        setSchemas(response.data);
      } catch (error) {
        console.error("Error fetching schemas:", error);
      }
    };

    fetchSchemas();
  }, []);

  useEffect(() => {
    if (selectedSchema) {
      const fetchTables = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/schemas/${selectedSchema}/tables`
          );
          setTables(response.data);
          setSelectedTable(null);
          setColumns([]);
          setTableData([]);
        } catch (error) {
          console.error("Error fetching tables:", error);
        }
      };

      fetchTables();
    }
  }, [selectedSchema]);

  useEffect(() => {
    if (selectedTable) {
      const fetchTableData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/schemas/${selectedSchema}/tables/${selectedTable}/data`
          );
          setTableData(response.data);
        } catch (error) {
          console.error("Error fetching table data:", error);
        }
      };

      fetchTableData();
    }
  }, [selectedTable, selectedSchema]);

  const handleGenerateAIContent = () => {
    if (!selectedSchema || !selectedTable) {
      toast.error("Please select a schema and table first.");
      return;
    }
    navigate(`/generate-ai-content?schema=${selectedSchema}&table=${selectedTable}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      {/* Schemas Section */}
      <motion.section
        className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg shadow-2xl mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
          Schemas
        </h2>
        <ul className="space-y-4">
          {schemas
            .filter(
              (schema) =>
                schema.schema_name !== "pg_toast" && // Filter out "pg_toast"
                schema.schema_name !== "unified_schema" // Filter out "unified_schema"
            )
            .map((schema) => (
              <motion.li
                key={schema.schema_name}
                className={`p-3 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
                  selectedSchema === schema.schema_name
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg"
                    : "hover:bg-gradient-to-r hover:from-cyan-700 hover:to-blue-700 hover:shadow-lg"
                }`}
                onClick={() => {
                  setSelectedSchema(schema.schema_name);
                  setSelectedTable(null);
                  setColumns([]);
                  setTableData([]);
                }}
                whileHover={{ scale: 1.02 }}
              >
                {schema.schema_name}
              </motion.li>
            ))}
        </ul>
      </motion.section>

      {/* Tables Section */}
      {selectedSchema && (
        <motion.section
          className="bg-gray-800 p-6 rounded-lg shadow-2xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-gray-300 mb-6">Tables</h2>
          <ul className="space-y-3">
            {tables.map((table) => (
              <motion.li
                key={table.table_name}
                className={`p-3 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
                  selectedTable === table.table_name
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 shadow-lg"
                    : "hover:bg-gradient-to-r hover:from-cyan-700 hover:to-blue-700 hover:shadow-lg"
                }`}
                onClick={() => setSelectedTable(table.table_name)}
                whileHover={{ scale: 1.02 }}
              >
                {table.table_name}
              </motion.li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* Table Data Section */}
      {selectedTable && (
        <motion.section
          className="bg-gray-900 p-6 rounded-lg shadow-2xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold text-gray-200 mb-6">Table Data</h2>
          {tableData.length > 0 ? (
            <div className="overflow-auto max-h-[50vh]">
              <table className="w-full border-collapse border border-gray-700">
                <thead>
                  <tr className="bg-gradient-to-r from-cyan-700 to-blue-700 text-gray-300">
                    {Object.keys(tableData[0]).map((column) => (
                      <th
                        key={column}
                        className="border border-gray-700 p-2 text-left"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-gradient-to-r hover:from-cyan-800 hover:to-blue-800 transition-all duration-300"
                    >
                      {Object.values(row).map((value, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-700 p-2"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400">No data available for this table.</p>
          )}
        </motion.section>
      )}

      {/* Buttons Section */}
      <div className="flex justify-center space-x-4">
        <motion.button
          onClick={() => navigate('/unified-schema')}
          className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg shadow-lg hover:from-red-600 hover:to-pink-600 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          Unify Schemas
        </motion.button>

        <motion.button
          onClick={handleGenerateAIContent}
          className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg shadow-lg hover:from-green-600 hover:to-teal-600 transition-transform transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
        >
          Generate AI Content
        </motion.button>
      </div>
    </div>
  );
};

export default SchemaExplorer;