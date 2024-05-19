// swaggerDoc.js
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output.json");
const app = express();
const routes = require("./routes/contacts"); // Path to your routes file

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Use your existing routes
app.use("/contacts", routes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(
    "Swagger documentation available at http://localhost:3000/api-docs"
  );
});
