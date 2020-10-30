const express = require("express");
const  {graphqlHTTP}  = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
//need to see
const cors = require("cors")
const app = express();
app.use(cors());

mongoose.connect(
  "mongodb+srv://administrator:administrator@cluster0.gqs94.mongodb.net/readerscorner?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.connection.once("open", () => {
  console.log("connected");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("now listning at 4000");
});
