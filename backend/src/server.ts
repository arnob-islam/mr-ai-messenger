import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import app from "./app";
import Resovers from "./GraphQl/Resolver/app";
import TypeDefs from "./GraphQl/TypeDefs/app";
import Socket from "./Controllers/Socket.io";

const PORT = process.env.PORT || 5000;

const getStarted = async () => {
  try {
    const httpServer = createServer(app);
    const server = new ApolloServer({
      resolvers: Resovers,
      typeDefs: TypeDefs,
    });

    await server.start();
    server.applyMiddleware({
      app,
      // in playground make sure corse is false
      // cors: false,
      // in react or client, make sure corse is this
      cors: {
        origin: "/",
        credentials: true,
      },
    });
    const socketServer = httpServer.listen(PORT, () =>
      console.log("server running at " + PORT)
    );

    Socket(socketServer);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

getStarted();
