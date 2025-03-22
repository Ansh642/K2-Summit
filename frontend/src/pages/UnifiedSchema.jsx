import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";

const UnifiedSchema = () => {
  const [unifiedSchema, setUnifiedSchema] = useState(null);
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

  // Render the graph when unifiedSchema changes
  useEffect(() => {
    if (!unifiedSchema) return;
  
    const width = 1400; // Increased width for better visibility
    const height = 1000; // Increased height for better visibility
  
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
          columns: columns,
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
              columns: [],
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
      .force("link", d3.forceLink(edges).id(d => d.id).distance(300)) // Increased distance between nodes
      .force("charge", d3.forceManyBody().strength(-800)) // Increased repulsion strength
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX().strength(0.2)) // Add force to spread nodes horizontally
      .force("y", d3.forceY().strength(0.2)); // Add force to spread nodes vertically
  
    const link = svg.append("g")
      .selectAll("line")
      .data(edges)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);
  
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);
  
    // Draw table boxes
    node.append("rect")
      .attr("width", 220) // Increased width for better visibility
      .attr("height", d => 40 + d.columns.length * 20) // Increased height for better visibility
      .attr("fill", "#69b3a2")
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
  
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x + 110)
        .attr("y1", d => d.source.y + 20)
        .attr("x2", d => d.target.x + 110)
        .attr("y2", d => d.target.y + 20);
  
      node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });
  }, [unifiedSchema]);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
        Unified Schema
      </h1>

      {unifiedSchema ? (
        <svg ref={graphRef}></svg>
      ) : (
        <p className="text-gray-400">Loading unified schema...</p>
      )}
    </div>
  );
};

export default UnifiedSchema;