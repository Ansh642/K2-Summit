# Metaflow

Metaflow is a comprehensive schema visualization and management tool designed to help developers and database administrators understand, explore, and manage database schemas with ease. The project provides a unified view of multiple database schemas, allowing users to visualize relationships between tables, explore table metadata, and generate AI-powered descriptions for schema elements. With an intuitive user interface and powerful backend, Metaflow simplifies database schema exploration and documentation.

---

## Features

1. **Unified Schema Visualization**:
   - Visualize multiple database schemas in a single, unified graph.
   - Highlight relationships between tables using foreign keys.
   - Interactive graph with zoom, pan, and node selection.

2. **Table Exploration**:
   - View detailed metadata for each table, including column names, data types, and primary keys.
   - Explore table data with a preview of the first 100 rows.

3. **AI-Powered Descriptions**:
   - Generate short, meaningful descriptions for schema elements (tables and columns) using AI.
   - Edit and regenerate descriptions as needed.

4. **Search and Filter**:
   - Search for tables or columns by name.
   - Highlight matching nodes in the graph for quick navigation.

5. **Export Metadata**:
   - Export schema metadata in JSON or YAML format for documentation or sharing.

6. **Responsive and Modern UI**:
   - Built with React and Tailwind CSS for a sleek and responsive user interface.
   - Smooth animations and transitions for an enhanced user experience.

---

## Technologies Used

- **Frontend**:
  - React.js
  - Tailwind CSS
  - D3.js (for graph visualization)
  - Axios (for API requests)

- **Backend**:
  - Node.js
  - Express.js
  - PostgreSQL (for database interaction)

- **AI Integration**:
  - Gemini API (for generating AI-powered descriptions)

---

## Getting Started

Follow these steps to set up and run Metaflow on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- PostgreSQL (for database setup)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ansh642/K2-Summit.git
   cd metaflow
   ```

2. **Set Up the Backend**:
   - Navigate to the `server` directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Set up your PostgreSQL database and update the connection details in `server/config/db.js`.
   - Run the server:
     ```bash
     npm run start
     ```

3. **Set Up the Frontend**:
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   - Open your browser and navigate to `http://localhost:5173` to access Metaflow.

---

## Usage

### Schema Visualization
- The main graph displays all tables and their relationships.
- Click on a table node to view its details in the side panel.

### Table Details
- In the side panel, you can view:
  - Table metadata (columns, data types, primary keys).
  - A preview of the table data.
  - AI-generated descriptions for columns.

### AI-Powered Descriptions
- Click the "Generate Description" button to create a short description for a table or column.
- Edit or regenerate descriptions as needed.

### Export Metadata
- Use the "Export Metadata" button to download schema metadata in JSON or YAML format.

---

## Project Structure

```
metaflow/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Application pages
│   │   ├── App.jsx           # Main application component
│   │   └── index.js          # Entry point
│   ├── tailwind.config.js    # Tailwind CSS configuration
│   └── package.json          # Frontend dependencies
├── server/
│   ├── config/               # Configuration files
│   ├── controllers/          # API controllers
│   ├── routes/               # API routes
│   ├── models/               # Database models
│   ├── app.js                # Express application
│   └── package.json          # Backend dependencies
└── README.md                 # Project documentation
```

---

## Contributing

We welcome contributions to Metaflow! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and descriptive messages.
4. Submit a pull request.

---

## License

Metaflow is open-source software licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- **D3.js** for providing powerful graph visualization capabilities.
- **Tailwind CSS** for making it easy to build a responsive and modern UI.
- **Gemini API** for enabling AI-powered descriptions.

---

## Contact

For questions, feedback, or support, please reach out to:

- **Your Name**  
  Email: anshagarwal642@gmail.com
---



## Future Enhancements

- Add support for more database types (e.g., MySQL, MongoDB).
- Implement user authentication and role-based access control.
- Enhance AI capabilities for generating more detailed schema documentation.

---

Thank you for using Metaflow! We hope it simplifies your database schema management and exploration. 🚀
