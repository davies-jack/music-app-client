import { useState, ReactElement } from "react";

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

export default function Dashboard({ code }: Props): ReactElement {
  const [search, setSearch] = useState<string>("");

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>
        You're able to search for artists, or song names in the input below.
      </p>
      <SearchForm search={search} setSearch={setSearch} />

      <div className="searchResults"></div>
    </div>
  );
}
