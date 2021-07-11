import { useState, ReactElement } from "react";

type Props = {
  code: string;
};

export default function Dashboard({ code }: Props): ReactElement {
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    if (value !== search) setSearch(value);
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>
        You're able to search for artists, or song names in the input below.
      </p>

      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-field">Song name, or artist</label>
        <input
          type="text"
          name="search-field"
          id="search-field"
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
}
