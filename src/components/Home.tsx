import React, { ReactElement } from "react";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=e3c179bcc337497e838636714ee29b09&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

interface Props {}

export default function Home({}: Props): ReactElement {
  return (
    <div>
      <h1>You gotta log in to Spotify!</h1>
      <a href={AUTH_URL}>Click here</a>
    </div>
  );
}
