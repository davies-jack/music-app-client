import Dashboard from "./components/Dashboard";
import Home from "./components/Home";

const getLoginCode = new URLSearchParams(window.location.search).get("code");

function App() {
  return (
    <div>
      <h1>music app</h1>

      {getLoginCode ? <Dashboard code={getLoginCode.toString()} /> : <Home />}
    </div>
  );
}

export default App;
