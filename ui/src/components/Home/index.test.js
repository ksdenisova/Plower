import Home from '.';
import { render, screen } from "@testing-library/react"

test('renders the header on Home page', () => {
  render(<Home />);

  const header = screen.getByText("Plower");

  expect(header).toBeInTheDocument();
});
