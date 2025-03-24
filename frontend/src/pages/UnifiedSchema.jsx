import { useEffect, useRef, useState } from "react";
import axios from "axios";
import * as d3 from "d3";
import { Card, Table, Tag, Space } from 'antd';
import { DatabaseOutlined } from '@ant-design/icons';
import './UnifiedSchema.css'; // For custom table styles

const UnifiedSchema = () => {
  const [unifiedSchema, setUnifiedSchema] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isPanelVisible, setIsPanelVisible] = useState(false);
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
        setIsPanelVisible(true);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTableData();
  }, [selectedTable]);

  // Render the graph when unifiedSchema changes
  useEffect(() => {
    if (!unifiedSchema) return;

    const width = 1000;
    const height = 500;

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
      .force("link", d3.forceLink(edges).id(d => d.id).distance(400))
      .force("charge", d3.forceManyBody().strength(-1300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX().strength(0.2))
      .force("y", d3.forceY().strength(0.2));

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
      .attr("width", 220)
      .attr("height", d => 40 + d.columns.length * 20)
      .attr("fill", d => d.isHighlighted ? "#FFD700" : "#69b3a2")
      .attr("stroke", "#333")
      .attr("rx", 5)
      .attr("ry", 5);

    // Draw table names
    node.append("text")
      .text(d => d.label)
      .attr("x", 10)
      .attr("y", 25)
      .attr("font-size", 16)
      .attr("fill", "#fff")
      .attr("font-weight", "bold");

    // Draw columns
    node.selectAll("column")
      .data(d => d.columns)
      .enter()
      .append("text")
      .text(col => `${col.name} (${col.type}) ${col.isPrimaryKey ? "PK" : ""}`)
      .attr("x", 10)
      .attr("y", (col, i) => 50 + i * 20)
      .attr("font-size", 14)
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

  // Prepare columns for AntD table
  const tableColumns = selectedTable?.columns.map(col => ({
    title: (
      <Space>
        <span>{col.name}</span>
        {col.isPrimaryKey && <Tag color="green">PK</Tag>}
      </Space>
    ),
    dataIndex: col.name,
    key: col.name,
    render: (text) => <span className="text-gray-300">{text || 'NULL'}</span>
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-300">
        Unified Schema
      </h1>

      {/* Search Bar */}
      <div className="mb-4">
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
        <svg ref={graphRef} className="mt-4 cursor-pointer"></svg> 
      ) : (
        <p className="text-gray-400">Loading unified schema...</p>
      )}

      {/* Table Details Panel Below Graph */}
      {selectedTable && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <DatabaseOutlined className="mr-2 text-xl" style={{ color: '#6366F1' }} />
            <h2 className="text-2xl font-bold">
              <span style={{ color: '#6366F1' }}>{selectedTable.schema}</span>
              <span className="mx-2">/</span>
              <span>{selectedTable.label}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {selectedTable.columns.map((col) => (
              <Card 
                key={col.name}
                className="bg-gray-700 border-gray-600"
                bodyStyle={{ padding: '12px' }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-100">{col.name}</p>
                    <p className="text-sm text-gray-400">{col.type}</p>
                  </div>
                  {col.isPrimaryKey && (
                    <Tag color="green">PK</Tag>
                  )}
                </div>
              </Card>
            ))}
          </div>

          <div className="max-h-96 overflow-auto">
            <Table
              columns={tableColumns}
              dataSource={tableData}
              pagination={false}
              scroll={{ x: true }}
              rowClassName={() => 'hover:bg-gray-700'}
              bordered
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedSchema;