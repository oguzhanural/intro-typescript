import { RESTDataSource } from "@apollo/datasource-rest";

type Playlist = {
    id: string;
    name: string;
    description: string;
}

export class SpotifyAPI extends RESTDataSource {
    baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";

    async getFeaturedPlaylist(): Promise<Playlist[]> {
        //The RESTDataSource class provides helper methods for HTTP requests. 
        // In our case, we want to perform a GET request to the 
        // browse/featured-playlists endpoint.
        const response = await this.get<{ playlist: { items: Playlist[] }}>('browse/featured-playlists');
        return response.playlist.items;
    }
}