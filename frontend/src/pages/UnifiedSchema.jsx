import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const UnifiedSchema = () => {
  const [unifiedSchema, setUnifiedSchema] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([]);
  const graphRef = useRef();

  // Fetch unified schema data from the backend
  useEffect(() => {
    const fetchUnifiedSchema = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/unified-schema");
        setUnifiedSchema(response.data);
      } catch (error) {
        console.error("Error fetching unified schema:", error);
      }
    };

    fetchUnifiedSchema();
  }, []);

  // Fetch table data when a table is selected
  useEffect(() => {
    if (!selectedTable) return;

    const fetchTableData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/schemas/${selectedTable.schema}/tables/${selectedTable.label}/data`
        );
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTableData();
  }, [selectedTable]);

  // Render the graph when unifiedSchema changes
  useEffect(() => {
    if (!unifiedSchema) return;

    const width = 1000; // Increased width for better visibility
    const height = 500; // Reduced height to fit better on the screen

    const svg = d3.select(graphRef.current)
      .attr("width", width)
      .attr("height", height);

    // Clear previous graph
    svg.selectAll("*").remove();

    // Create nodes and edges
    const nodes = [];
    const edges = [];

    // First pass: Add all tables to nodes with detailed columns
    Object.entries(unifiedSchema).forEach(([schema, tables]) => {
      tables.forEach((table) => {
        const columns = table.columns.map(col => ({
          name: col.column_name,
          type: col.data_type,
          isPrimaryKey: col.is_primary_key || false,
        }));

        nodes.push({
          id: `${schema}.${table.table_name}`,
          label: table.table_name,
          schema: schema,
          columns: columns,
          isHighlighted: searchQuery
            ? table.table_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              columns.some(col => col.name.toLowerCase().includes(searchQuery.toLowerCase()))
            : false,
        });
      });
    });

    // Second pass: Add edges and ensure referenced tables are in nodes
    Object.entries(unifiedSchema).forEach(([schema, tables]) => {
      tables.forEach((table) => {
        table.foreign_keys.forEach((fk) => {
          const targetNodeId = `${fk.referenced_schema}.${fk.referenced_table}`;
          if (!nodes.find(node => node.id === targetNodeId)) {
            nodes.push({
              id: targetNodeId,
              label: fk.referenced_table,
              schema: fk.referenced_schema,
              columns: [],
              isHighlighted: false,
            });
          }
          edges.push({
            source: `${schema}.${table.table_name}`,
            target: targetNodeId,
            label: fk.fk_column,
          });
        });
      });
    });

    // Draw nodes and edges
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(edges).id(d => d.id).distance(400)) // Increased distance between nodes
      .force("charge", d3.forceManyBody().strength(-1300)) // Increased repulsion strength
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX().strength(0.2)) // Add force to spread nodes horizontally
      .force("y", d3.forceY().strength(0.2)); // Add force to spread nodes vertically

    const link = svg.append("g")
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke", "#4FD1C5")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`)
      .on("click", (event, d) => setSelectedTable(d));

    // Draw table boxes
    node.append("rect")
      .attr("width", 220) // Increased width for better visibility
      .attr("height", d => 40 + d.columns.length * 20) // Increased height for better visibility
      .attr("fill", d => d.isHighlighted ? "#FFD700" : "#69b3a2") // Highlight searched nodes
      .attr("stroke", "#333")
      .attr("rx", 5) // Rounded corners
      .attr("ry", 5);

    // Draw table names
    node.append("text")
      .text(d => d.label)
      .attr("x", 10)
      .attr("y", 25)
      .attr("font-size", 16) // Increased font size
      .attr("fill", "#fff")
      .attr("font-weight", "bold");

    // Draw columns
    node.selectAll("column")
      .data(d => d.columns)
      .enter()
      .append("text")
      .text(col => `${col.name} (${col.type}) ${col.isPrimaryKey ? "PK" : ""}`)
      .attr("x", 10)
      .attr("y", (col, i) => 50 + i * 20) // Adjusted vertical spacing
      .attr("font-size", 14) // Increased font size
      .attr("fill", "#333");

    // Add arrow markers for edges
    svg.append("defs").append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#4FD1C5");

    // Update positions on each tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x + 110)
        .attr("y1", d => d.source.y + 20)
        .attr("x2", d => d.target.x + 110)
        .attr("y2", d => d.target.y + 20);

      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });
  }, [unifiedSchema, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4"> {/* Reduced padding from p-8 to p-4 */}
      <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300"> {/* Reduced margin-bottom from mb-8 to mb-4 */}
        Unified Schema
      </h1>

      {/* Search Bar */}
      <div className="mb-4"> {/* Reduced margin-bottom from mb-8 to mb-4 */}
        <input
          type="text"
          placeholder="Search tables or columns..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>

      {/* Graph */}
      {unifiedSchema ? (
        <svg ref={graphRef} className="mt-4"></svg> 
      ) : (
        <p className="text-gray-400">Loading unified schema...</p>
      )}

      {/* Table Details Panel */}
      {selectedTable && (
        <div className="fixed top-0 right-0 mt-10 w-1/3 h-[90%] bg-gray-800 p-6 overflow-y-auto shadow-lg">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">{selectedTable.label}</h2>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Schema: {selectedTable.schema}</h3>

          {/* Table Columns */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-300 mb-2">Columns</h4>
            <div className="space-y-2">
              {selectedTable.columns.map((col) => (
                <div key={col.name} className="text-sm text-gray-300">
                  <span className="font-medium">{col.name}</span> ({col.type}){" "}
                  {col.isPrimaryKey && <span className="text-green-400">PK</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Table Data */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-300 mb-2">Table Data</h4>
            <div className="overflow-auto max-h-96">
              <table className="w-full border-collapse border border-gray-700">
                <thead>
                  <tr className="bg-gray-700 text-gray-300">
                    {selectedTable.columns.map((col) => (
                      <th key={col.name} className="border border-gray-700 p-2 text-left">
                        {col.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-700 transition-colors">
                      {selectedTable.columns.map((col) => (
                        <td key={col.name} className="border border-gray-700 p-2">
                          {row[col.name]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setSelectedTable(null)}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default UnifiedSchema;