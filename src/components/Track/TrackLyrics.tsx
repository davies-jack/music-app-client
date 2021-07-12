import axios from "axios";
import { useState, useEffect, ReactElement } from "react";
import styled from "styled-components";
import { Track } from "../../types/Track";

const StyledLyrics = styled.div`
  white-space: pre;
  text-align: center;
  margin: 1em 0 5% 0;
  line-height: 1.4em;
`;

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
  return <StyledLyrics>{lyrics}</StyledLyrics>;
}
