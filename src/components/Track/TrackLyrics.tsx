import axios from "axios";
import { useState, useEffect, ReactElement } from "react";
import { Track } from "../../types/Track";

export default function TrackLyrics({
  selected,
  lyrics,
  setLyrics,
}: {
  selected: Track | null;
  lyrics: string | null;
  setLyrics: (lyrics: string) => void;
}): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!selected) return;
    setIsLoading(true);
    axios
      .get("http://localhost:8080/lyrics", {
        params: {
          track: selected.trackName,
          artist: selected.artist,
        },
      })
      .then(({ data: { lyrics } }) => setLyrics(lyrics))
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  }, [selected]);

  if (isLoading && selected) return <div>Loading...</div>;
  return <div>{lyrics}</div>;
}
