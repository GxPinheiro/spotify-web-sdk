import { getAxiosSpotifyInstance } from './driver';
import Album from './models/album/album';
import TrackSimplified from './models/track/track-simplified';
import Page from './models/paging/page';

export const getAlbum = async (id: string, market?: string): Promise<Album> => {
    const params = { params: { market } };
    const response = await getAxiosSpotifyInstance().get(
        `/albums/${id}`,
        params
    );

    return new Album(response.data);
};

export const getSeveralAlbums = async (
    ids: string[],
    market?: string
): Promise<Album[]> => {
    if (ids.length > 20) {
        const exceptionLink =
            'https://developer.spotify.com/documentation/web-api/reference/albums/get-several-albums/';
        throw new Error(
            `The maximum number of albums is 20. See ${exceptionLink} for details`
        );
    }
    const params = { params: { ids: ids.join(','), market } };
    const response = await getAxiosSpotifyInstance().get('/albums', params);

    return response.data.albums.map((albumJson: any) => new Album(albumJson));
};

export const getAlbumTracks = async (
    id: string,
    offset = 0,
    limit = 20,
    market?: string
): Promise<Page<TrackSimplified>> => {
    const params = { params: { offset, limit, market } };
    const response = await getAxiosSpotifyInstance().get(
        `/albums/${id}/tracks`,
        params
    );
    return new Page<TrackSimplified>(response.data, TrackSimplified);
};
