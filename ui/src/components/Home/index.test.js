import Home from '.';
import { render, screen, fireEvent } from "@testing-library/react"

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

test('does not render the window for adding a new plant by default', () => {
  render(<Home />);

  const popup = screen.queryByTestId("newPlant");

  expect(popup).not.toBeInTheDocument();
});

test('renders the window for adding a new plant if plus button has been clicked', () => {
  render(<Home />);

  const button = screen.getByTestId("addButton");
  fireEvent.click(button);

  const popup = screen.queryByTestId("newPlant");

  expect(popup).toBeInTheDocument();
});
