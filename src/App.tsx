import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=e3c179bcc337497e838636714ee29b09&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

const StyledHeader = styled.header`
  background-color: #1f2937;
  padding: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1em;
  }

  ul {
    padding: 0;
    margin: 0;
    li {
      list-style-type: none;
      display: inline-block;

      &:not(:last-of-type) {
        margin-right: 1em;
      }
    }
  }
`;

const getLoginCode = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <div>
      <StyledHeader>
        <h1>spotify plus plus</h1>

        <nav>
          {getLoginCode ? (
            <ul>
              <li>Dashboard</li>
              <li>Playlists</li>
            </ul>
          ) : (
            <ul>
              <li>
                <a href={AUTH_URL}>Login with Spotify</a>
              </li>
            </ul>
          )}
        </nav>
      </StyledHeader>

      {getLoginCode ? <Dashboard code={getLoginCode.toString()} /> : <Home />}
    </div>
  );
}

export default App;
