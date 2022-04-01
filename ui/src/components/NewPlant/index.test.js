import NewPlant from '.';
import { render, screen } from "@testing-library/react"

test('renders form with placeholder for a new plant name', () => {
  render(<NewPlant />);

  const form = screen.getByRole("textbox");
  const placeholder = screen.getByPlaceholderText("What's the name of your plant?");

  expect(form).toBeInTheDocument();
  expect(placeholder).toBeInTheDocument();
});

test('renders a default new plant image', () => {
  render(<NewPlant />);

  const image = screen.getByRole("img");

  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", "/new_plant.png");
});

test('renders the plus button for adding a new plant', () => {
  render(<NewPlant />);

  const button = screen.getByTestId("saveButton");

  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent("+");
});

