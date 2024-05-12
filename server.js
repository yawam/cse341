const express = require("express");
require("dotenv").config();
const app = express();
const contactRoutes = require("./routes/contacts");

app.use(express.json());

app.use("/contacts", contactRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server listening on port ` + `http://localhost:${process.env.PORT || 3000}`
  );
});
