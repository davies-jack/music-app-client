import { useState, useEffect, ReactElement } from "react";
import styled from "styled-components";
import { Track } from "../../types/Track";

const StyledTrackResults = styled.div<any>`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 5em;
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 768px) {
    width: 99%;
  }
`;

const StyledTrackResult = styled.div<any>`
  margin: 1em;
  border: 1px solid #374151;
  cursor: pointer;

  &.currently-playing {
    transition: ease-in-out 0.3s;
    border: 1px solid #6d28d9;
  }

  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    margin-right: 1em;
    padding-left: 0.6em;
    height: 64px;
    width: 64px;
  }

  > div {
    h3 {
      font-weight: normal;
      margin-bottom: 0;
    }
    p {
      margin-top: 0.6em;
      font-size: 0.8em;
      color: #4b5563;
    }
  }
`;

export default function TrackResults({
  search,
  setSearch,
  accessToken,
  spotifyApi,
  selected,
  setSelected,
}: {
  search: string;
  setSearch: (value: string) => void;
  accessToken: string | null;
  spotifyApi: any;
  selected: Track | null;
  setSelected: (select: any) => any;
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
    <StyledTrackResults>
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
          <StyledTrackResult
            key={uri}
            onClick={() =>
              setSelected({ trackName, artist, uri, explicit, image })
            }
            onKeyDown={(e: any) => {
              if (e.keyCode === 13)
                setSelected({ trackName, artist, uri, explicit, image });
            }}
            tabIndex={0}
            className={
              selected !== null && selected.uri === uri && `currently-playing`
            }
          >
            <img src={image} alt={`Cover art for ${trackName}`} />
            <div>
              <h3>{trackName}</h3>
              <p>{artist}</p>
              <span className="explicit">{explicit && `explicit!`}</span>
            </div>
          </StyledTrackResult>
        )
      )}
    </StyledTrackResults>
  );
}
