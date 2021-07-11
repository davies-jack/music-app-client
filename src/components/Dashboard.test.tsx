import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Dashboard from "./Dashboard";

test("Loads dashboard component", async () => {
  render(<Dashboard code={"testCode"} />);
  await screen.findByText(
    /You're able to search for artists, or song names in the input below./i
  );

  const getSearchInput = screen.getByLabelText(/song name, or artist/i);
  userEvent.type(getSearchInput, "song name");
});
