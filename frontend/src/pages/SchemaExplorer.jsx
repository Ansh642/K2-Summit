import { useState, useEffect } from "react";
import axios from "axios";

const SchemaExplorer = () => {
  const [schemas, setSchemas] = useState([]);
  const [tables, setTables] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  
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

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar - Schemas */}
      <aside className="w-1/4 bg-gradient-to-b from-blue-800 to-indigo-900 p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Schemas</h2>
        <ul className="space-y-4">
          {schemas.map((schema) => (
            <li
              key={schema.schema_name}
              className={`p-3 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
                selectedSchema === schema.schema_name ? "bg-indigo-600" : "hover:bg-blue-600"
              }`}
              onClick={() => {
                setSelectedSchema(schema.schema_name);
                setSelectedTable(null);
                setColumns([]);
                setTableData([]);
              }}
            >
              {schema.schema_name}
            </li>
          ))}
        </ul>
      </aside>

      {/* Middle Panel - Tables */}
      <main className="w-1/4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-300 mb-6">Tables</h2>
        {selectedSchema ? (
          <ul className="space-y-3">
            {tables.map((table) => (
              <li
                key={table.table_name}
                className={`p-3 cursor-pointer rounded-lg transition-all duration-300 ease-in-out ${
                  selectedTable === table.table_name ? "bg-gray-700" : "hover:bg-gray-600"
                }`}
                onClick={() => setSelectedTable(table.table_name)}
              >
                {table.table_name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">Select a schema to view tables.</p>
        )}
      </main>

      {/* Right Panel - Table Data */}
      <section className="w-2/4 bg-gray-900 p-8 border-l border-gray-700 rounded-lg shadow-lg overflow-auto">
        <h2 className="text-xl font-bold text-gray-200 mb-6">Table Data</h2>
        {selectedTable ? (
          tableData.length > 0 ? (
            <div className="overflow-auto max-h-[70vh]">
              <table className="w-full border-collapse border border-gray-700">
                <thead>
                  <tr className="bg-gray-800 text-gray-300">
                    {Object.keys(tableData[0]).map((column) => (
                      <th key={column} className="border border-gray-700 p-2 text-left">
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-800">
                      {Object.values(row).map((value, colIndex) => (
                        <td key={colIndex} className="border border-gray-700 p-2">
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
          )
        ) : (
          <p className="text-gray-400">Select a table to view its data.</p>
        )}
      </section>
    </div>
  );
};

export default SchemaExplorer;
