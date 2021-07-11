import { useState, useEffect, ReactElement } from "react";
import useAuth from "../hooks/useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import SearchForm from "./Track/TrackSearchForm";
import TrackResults from "./Track/TrackResults";

const spotifyApi = new SpotifyWebApi({
  clientId: "e3c179bcc337497e838636714ee29b09",
});

type Props = {
  code: string;
};

export default function Dashboard({ code }: Props): ReactElement {
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState(null);

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
        spotifyApi={spotifyApi}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
}
