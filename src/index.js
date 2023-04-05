import { ApolloServer } from "apollo-server";
import { schema } from "./schema.js";
import { dataSources } from "./dataSource.js";

const server = new ApolloServer({ schema, dataSources });
const port = Number.parseInt(process.env.PORT) || 4000;

server.listen(port).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
