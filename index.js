const express = require("express");
const app = express();
const mongoose = require



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});