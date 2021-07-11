import { ReactElement } from "react";
import styled from "styled-components";

const StyledSearchForm = styled.form`
  width: 80%;
  margin: 0 auto;
  padding: 0 1em;
  @media (max-width: 768px) {
    width: 99%;
  }
  label {
    margin-right: 1em;
    color: #e5e7eb;
  }
`;

export default function SearchForm({
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
    <StyledSearchForm onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search-field">Song name, or artist</label>
      <input
        type="text"
        name="search-field"
        id="search-field"
        onChange={handleSearchChange}
        value={search}
      />
    </StyledSearchForm>
  );
}
