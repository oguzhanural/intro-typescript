// TODO
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"
import { readFileSync } from "fs";
import path from "path"
import { gql } from "graphql-tag"
import { resolvers } from "./resolvers";
import { SpotifyAPI } from "./datasources/spotify-api";
import { DataSourceContext } from "./context";

/**
 * Resolvers fonksiyonunu tanımlamadan önce yazmış olduğumuz mock veriyi ve paketleri kaldıralım.
 * import { addMocksToSchema } from "@graphql-tools/mock";  
 * import { makeExecutableSchema } from "@graphql-tools/schema";
 * const mocks = {
    Query: () => ({
        featuredPlaylists: () => [... new Array(6)]
    }),
    Playlist: () => ({
        id: () => "playlist_01",
        name: () => "Groovin with Graphql",
        description: () => 
        "Serving up the hottest development hits, Groovin' with GraphQL has everything you need to get into the coding mindspace... and stay there!",
    }),

    const server = new ApolloServer({
        schema: addMocksToSchema({
            schema: makeExecutableSchema({ typeDefs }),
            mocks: mocks
        })
    });
};
 */

const typeDefs = gql(
    readFileSync(path.resolve(__dirname, "./schema.graphql"), {
        encoding: "utf-8",
    })
);

async function startApolloServer() {
    const server = new ApolloServer({
        typeDefs: typeDefs,
        resolvers: resolvers,
    });

    /*To connect our server with our SpotifyAPI, we'll jump down to the startStandaloneServer 
    function. This function takes a second argument, which is an object for configuring 
    your server's options 
    */
    const { url } = await startStandaloneServer(server, {
        // TODO configure server options
        context: async () => {
            // To take advantage of the RESTDataSource's caching capabilities, we need to pass in the server's cache to our SpotifyAPI.
            const { cache } = server;
            // this object becomes our resolver's contextValue, the third positional argument
            return {
                // TODO
                dataSources: {
                    spotifyAPI: new SpotifyAPI({ cache }),
                },
            };
        },
    });
    console.log(`
        🚀 Server is runnig!
        📭 Query at ${url}
    `);
}

startApolloServer();