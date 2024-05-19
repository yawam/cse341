// swagger.js
const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Contacts API",
    description: "API documentation for contacts routes",
  },
  host: "localhost:3000", // Change this to your host if different
  schemes: ["http"],
  basePath: "/contacts",
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./routes/contacts.js"]; // Path to your route file

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server"); // Your project's entry point
});
