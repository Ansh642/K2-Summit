import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const GenerateAIContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [descriptions, setDescriptions] = useState({}); // Store generated descriptions
  const [loadingColumns, setLoadingColumns] = useState({}); // Track loading state for each column

  // Extract schema and table from query parameters
  const queryParams = new URLSearchParams(location.search);
  const schema = queryParams.get("schema");
  const table = queryParams.get("table");

  useEffect(() => {
    if (!schema || !table) {
      navigate("/schema-explorer"); // Redirect if no schema or table is selected
      return;
    }

    const fetchColumns = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/schemas/${schema}/tables/${table}/columns`
        );
        setColumns(response.data);
      } catch (error) {
        console.error("Error fetching columns:", error);
        setError("Failed to fetch columns.");
      } finally {
        setLoading(false);
      }
    };

    fetchColumns();
  }, [schema, table, navigate]);

  // Function to generate AI description for a column
  const generateDescription = async (column) => {
    try {
      setLoadingColumns((prev) => ({ ...prev, [column.column_name]: true })); // Set loading state

      const prompt = `Generate a 3-4 word short description for the column "${column.column_name}" in the table "${table}" (schema: ${schema}) with data type "${column.data_type}".`;

      const response = await axios.post("http://localhost:5000/api/ask-ai", {
        prompt: prompt,
      });

      // Update the descriptions state
      setDescriptions((prev) => ({
        ...prev,
        [column.column_name]: response.data.data,
      }));
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Failed to generate description. Please try again.");
    } finally {
      setLoadingColumns((prev) => ({ ...prev, [column.column_name]: false })); // Clear loading state
    }
  };

  
  const handleEditDescription = (columnName, newDescription) => {
    setDescriptions((prev) => ({
      ...prev,
      [columnName]: newDescription,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
        Generate AI Content
      </h1>

      {loading ? (
        <p className="text-gray-400">Loading columns...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            Table: {table}
          </h2>
          <div className="space-y-4">
            {columns.map((column) => (
              <div key={column.column_name} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-300">
                  {column.column_name} ({column.data_type})
                </h3>
                {descriptions[column.column_name] ? (
                  <div className="mt-2">
                    <textarea
                      className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      value={descriptions[column.column_name]}
                      onChange={(e) =>
                        handleEditDescription(column.column_name, e.target.value)
                      }
                    />
                    <button
                      className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-colors"
                      onClick={() => generateDescription(column)}
                    >
                      Regenerate Description
                    </button>
                  </div>
                ) : (
                  <button
                    className="mt-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-colors"
                    onClick={() => generateDescription(column)}
                    disabled={loadingColumns[column.column_name]}
                  >
                    {loadingColumns[column.column_name] ? (
                      <span>Generating...</span>
                    ) : (
                      <span>Generate Description</span>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateAIContent;