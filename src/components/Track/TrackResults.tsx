import { useState, useEffect, ReactElement } from "react";
export default function TrackResults({
  search,
  setSearch,
  accessToken,
  spotifyApi,
}: {
  search: string;
  setSearch: (value: string) => void;
  accessToken: string | null;
  spotifyApi: any;
}): ReactElement {
  const [trackResults, setTrackResults] = useState<any>([]);

  useEffect(() => {
    if (!accessToken) return;
    if (!search) {
      setTrackResults([]);
      return;
    }

    spotifyApi
      .searchTracks(search)
      .then(({ body: { tracks } }: { body: { tracks: any } }) => {
        if (typeof tracks !== "undefined") {
          setTrackResults(
            tracks.items.map(
              ({
                name,
                artists,
                uri,
                explicit,
                album: { images },
              }: {
                name: string;
                artists: { name: string }[];
                uri: string;
                explicit: boolean;
                album: {
                  images: any[];
                };
              }) => {
                const smallestAlbumCover = images.reduce(
                  (
                    smallest: { height: number; url: string; width: number },
                    current: { height: number; url: string; width: number }
                  ) => {
                    if (current.height < smallest.height) return current;
                    return smallest;
                  }
                );
                return {
                  trackName: name,
                  artist: artists[0].name,
                  uri,
                  explicit,
                  image: smallestAlbumCover.url,
                };
              }
            )
          );
        }
      })
      .catch((err: any) => console.error(err));
  }, [search]);

  return (
    <div className="searchResults">
      {trackResults.map(
        ({
          trackName,
          artist,
          uri,
          explicit,
          image,
        }: {
          trackName: string;
          artist: string;
          uri: string;
          explicit: boolean;
          image: string;
        }) => (
          <div key={uri}>
            <img src={image} alt={`Cover art for ${trackName}`} />
            <h3>{trackName}</h3>
          </div>
        )
      )}
    </div>
  );
}
