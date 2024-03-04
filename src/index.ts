// TODO
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { readFileSync } from "fs";
import path from "path"
import { gql } from "graphql-tag"
import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./schema.graphql"), {
        encoding: "utf-8",
    })
);

const mocks = {
    Query: () => ({
        featuredPlaylists: () => [... new Array(6)]
    }),
    Playlist: () => ({
        id: () => "playlist_01",
        name: () => "Groovin with Graphql",
        description: () => 
        "Serving up the hottest development hits, Groovin' with GraphQL has everything you need to get into the coding mindspace... and stay there!",
    }),
};

async function startApolloServer() {
    const server = new ApolloServer({
        schema: addMocksToSchema({
            schema: makeExecutableSchema({ typeDefs }),
            mocks: mocks
        })
    });
    const { url } = await startStandaloneServer(server);
    console.log(`
        🚀 Server is runnig!
        📭 Query at ${url}
    `);
}

startApolloServer();