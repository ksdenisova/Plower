import Home from '.';
import { render, screen } from "@testing-library/react"

test('renders the header on Home page', () => {
  render(<Home />);

  const header = screen.getByText("Plower");

  expect(header).toBeInTheDocument();
});

test('renders the plus button for adding a new plant', () => {
  render(<Home />);

  const button = screen.getByTestId("addButton");

  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("+");
});
