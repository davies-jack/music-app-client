import { useState, useEffect, ReactElement } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "e3c179bcc337497e838636714ee29b09",
});

type Props = {
  code: string;
};

function SearchForm({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}): ReactElement {
  const handleSearchChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    if (value !== search) setSearch(value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search-field">Song name, or artist</label>
      <input
        type="text"
        name="search-field"
        id="search-field"
        onChange={handleSearchChange}
      />
    </form>
  );
}

function TrackResults({
  search,
  setSearch,
  accessToken,
}: {
  search: string;
  setSearch: (value: string) => void;
  accessToken: string | null;
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
      .then(({ body: { tracks } }) => {
        if (typeof tracks !== "undefined") {
          console.log(tracks.items);

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
      .catch((err) => console.error(err));
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

export default function Dashboard({ code }: Props): ReactElement {
  const [search, setSearch] = useState<string>("");
  const accessToken = useAuth(code);

  useEffect(() => {
    if (accessToken) spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>
        You're able to search for artists, or song names in the input below.
      </p>

      <SearchForm search={search} setSearch={setSearch} />
      <TrackResults
        search={search}
        setSearch={setSearch}
        accessToken={accessToken}
      />
    </div>
  );
}
