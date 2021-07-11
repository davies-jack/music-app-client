import { useState, useEffect, ReactElement } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import styled from "styled-components";

const TrackPlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
`;

export default function TrackPlayer({
  accessToken,
  uri,
}: {
  accessToken: string | null;
  uri: string;
}): ReactElement | null {
  const [playing, setPlaying] = useState<boolean>(false);
  const uris = uri ? [uri] : [];
  useEffect(() => {
    setPlaying(true);
  }, [uri]);
  if (!accessToken) return null;
  return (
    <TrackPlayerContainer>
      <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        callback={(state) => (!state.isPlaying ? setPlaying(false) : null)}
        play={playing}
        uris={uris}
        styles={{
          bgColor: "#111827",
          color: "#F9FAFB",
          trackArtistColor: "#4B5563",
          trackNameColor: "#F9FAFB",
          sliderHandleColor: "#F9FAFB",
          sliderColor: "#6D28D9",
        }}
      />
    </TrackPlayerContainer>
  );
}
