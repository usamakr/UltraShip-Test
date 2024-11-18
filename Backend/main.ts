import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { startStandaloneServer } from "@apollo/server/standalone";

// Routes
import customerRoutes from "./routes/customerRoutes";
import playgroundRoutes from "./routes/playgroundRoutes";

// Environment variables
import { MONGODB_URL, SERVER_PORT } from "./globals";

// Resolvers
import { EmployeeResolver } from "./graphQL/employee";
import { SubjectResolver } from "./graphQL/subject"; // Assuming SubjectResolver
import { MyContext } from "./middleware/Authcontext";
import { getUser } from "./middleware/helpers";

const startServer = async () => {
  console.log(`Starting backend...`);

  const app = express();

  // Connect to MongoDB
  await mongoose.connect(MONGODB_URL as string);
  console.log(`Connected to MongoDB Atlas.`);

  // Create a schema from TypeGraphQL resolvers
  const schema = await buildSchema({
    resolvers: [EmployeeResolver, SubjectResolver], // Add any other resolvers here
  });

  // Instantiate Apollo Server
  const server = new ApolloServer<MyContext>({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req, res }) => {
      // Get the user token from the headers.
      const token = req.headers.authorization || "";
      // Try to retrieve a user with the token
      const user = await getUser(token);
      // Add the user to the context
      return user;
    },
  });
  console.log(`Server started on URL ${url}.`);
  // // Apply Apollo middleware to Express app
  // app.use("/graphql", bodyParser.json(), expressMiddleware(server));

  // // Adding routes
  // app.use("/customers", customerRoutes);
  // // app.use("/playground", playgroundRoutes);

  // // Start Express server
  // app.listen(SERVER_PORT, () => {
  //   console.log(`Server started on port ${SERVER_PORT}.`);
  //   console.log(`Apollo server available at http://localhost:${SERVER_PORT}/graphql`);
  // });
};

startServer();
