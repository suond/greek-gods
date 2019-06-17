const express = require("express");
// const app = express();
const app = require("./server/server");
const expressGraphQL = require("express-graphql");
const schema = require("./server/schema/schema");



const port = process.env.PORT || 5000;

app.use(
    "/graphql",
    expressGraphQL({
      schema,
      graphiql: true
    })
  );

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});