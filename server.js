require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

(async () => {
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });

  await apollo.start();

  const PORT = process.env.PORT;
  const app = express();
  app.use(logger("tiny"));
  app.use(graphqlUploadExpress());
  apollo.applyMiddleware({ app });
  app.use("/static", express.static("uploads"));

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/`);
  });
})();
