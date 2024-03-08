import { RESTDataSource } from "@apollo/datasource-rest";
import { Playlist } from "../types";

// Artık her defasında bir type tanımlamamıza ve bunu sürekli olarak schema ile sekronize tutmamıza 
// gerek yok. Bu yaklaşım zaten pratikte zor bir yaklaşım. Codegen ile schema'mıza uygun typescript type'ları oluşturuldu zaten.
// type Playlist2 = {
//     id: string;
//     name: string;
//     description: string;
// }

export class SpotifyAPI extends RESTDataSource {
    baseURL = "https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/";

    async getFeaturedPlaylist(): Promise<Playlist[]> {
        //The RESTDataSource class provides helper methods for HTTP requests. 
        // In our case, we want to perform a GET request to the 
        // browse/featured-playlists endpoint.
        const response = await this.get<{ 
            playlists: { 
                items: Playlist[]; 
            };
        }>('browse/featured-playlists');
        return response.playlists.items ?? [];
    }

    getPlaylist(playlistId: string): Promise<Playlist> {
        return this.get(`playlists/${playlistId}`)
    }
}