Here's your updated README.md with the dashboard information added:

# Metaflow

Metaflow is a comprehensive schema visualization and management tool designed to help developers and database administrators understand, explore, and manage database schemas with ease. The project provides a unified view of multiple database schemas, allowing users to visualize relationships between tables, explore table metadata, and generate AI-powered descriptions for schema elements.

## Features

1. **Unified Schema Visualization**
2. **Table Exploration**
3. **AI-Powered Descriptions**
4. **Search and Filter**
5. **Export Metadata**
6. **Responsive Modern UI**

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

#### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Ansh642/K2-Summit.git
   cd metaflow
   ```

2. **Set Up Backend**:
   ```bash
   cd server
   npm install
   npm run start
   ```

3. **Set Up Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the Application**:
   Open `http://localhost:5173` in your browser

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
