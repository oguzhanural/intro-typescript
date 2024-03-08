import { Resolvers, Track } from "./types";

export const resolvers: Resolvers = {
    Query: {
        // For the contextValue, we'll destructure it to access its child object dataSources. And we can omit the fourth parameter, info, as we won't use it.
        featuredPlaylists: (_, __, { dataSources } ) => {
            return dataSources.spotifyAPI.getFeaturedPlaylist();
        },
        playlist: async (_, { id }, { dataSources } ) => {
            
            const {
                id: playlistId,
                name,
                description,
                tracks: { items = [] } = {},
            } = await dataSources.spotifyAPI.getPlaylist(id);

            const newTrackItems = items.map(( { track }: {track: Track}) => {
                const { id, name, duration_ms, uri, explicit} = track ;
                return { id, name, durationMs: duration_ms, uri, explicit }
            });
            return { id: playlistId, name, description, tracks: newTrackItems}
        }
    },
};