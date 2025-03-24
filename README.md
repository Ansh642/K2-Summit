Metaflow
Metaflow is a comprehensive schema visualization and management tool designed to help developers and database administrators understand, explore, and manage database schemas with ease. The project provides a unified view of multiple database schemas, allowing users to visualize relationships between tables, explore table metadata, and generate AI-powered descriptions for schema elements.

Features
Unified Schema Visualization

Table Exploration

AI-Powered Descriptions

Search and Filter

Export Metadata

Responsive Modern UI

Technologies Used
Frontend: React.js, Tailwind CSS, D3.js, Axios

Backend: Node.js, Express.js

Database: PostgreSQL (Hosted on Neon)

AI: Gemini API

Demo Credentials
Copy
Email: ansh@gmail.com
Password: 123456
Getting Started
Accessing Your Data
Login using the demo credentials above

Navigate to the Dashboard from the main menu

Explore your dbt (data build tool) schemas and tables:

View table relationships

Examine column metadata

Generate AI descriptions for schema elements

Local Development
Prerequisites
Node.js (v16+)

npm (v8+)

PostgreSQL (or use Neon for cloud database)

Installation
Clone the Repository:

bash
Copy
git clone https://github.com/Ansh642/K2-Summit.git
cd metaflow
Set Up Backend:

bash
Copy
cd server
npm install
npm run start
Set Up Frontend:

bash
Copy
cd ../frontend
npm install
npm run dev
Access the Application:
Open http://localhost:5173 in your browser

Project Structure
Copy
metaflow/
├── frontend/       # React application
├── server/         # Node.js backend
└── README.md
Future Enhancements
Add support for MySQL/MongoDB

Implement user authentication

Enhanced AI documentation features

dbt-specific visualization improvements

Contact
For questions or support:

Ansh Agarwal
📧 anshagarwal642@gmail.com

🚀 Happy database exploring! After login, visit the Dashboard to explore your dbt schemas and visualize your data transformations.
