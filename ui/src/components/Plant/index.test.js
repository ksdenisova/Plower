import Plant from '.';
import { render, screen } from "@testing-library/react"

test('renders a plant name', () => {
  const testPlant = { "id": "0", "name": "Test plant name" };
  
  render(<Plant plant={testPlant}/>);

  const plantName = screen.getByText("Test plant name");

  expect(plantName).toBeInTheDocument();
});

test('renders a default plant image', () => {
  const testPlant = { "id": "0", "name": "Test plant name" };
  
  render(<Plant plant={testPlant}/>);

  const image = screen.getByRole("img");

  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute("src", "/default_plant.png");
});
