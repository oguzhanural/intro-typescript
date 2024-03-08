//  This is where we'll define the type that describes the context we pass to our server.
import { SpotifyAPI } from "./datasources/spotify-api";

// We want to give the dataSources object the same property that we set on our server, 
// so we can add a spotifyAPI key, along with the SpotifyAPI class. Be sure to import this class as well!
export type DataSourceContext = {
    dataSources: {
        spotifyAPI: SpotifyAPI;
    };
};