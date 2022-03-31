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

test('renders last watering date and time', () => {
  const testPlant = { "id": "0", "name": "Test plant name", "lastWatered": "2022-03-30T12:01:00" };
  
  render(<Plant plant={testPlant}/>);

  const lastWatered = screen.getByText("Last watered: March 30, 2022 at 12:01 pm");

  expect(lastWatered).toBeInTheDocument();
});

test("renders 'Not yet watered' if there are not last watering date and time", () => {
  const testPlant = { "id": "0", "name": "Test plant name", "lastWatered": "" };
  
  render(<Plant plant={testPlant}/>);

  const lastWatered = screen.getByText("Not yet watered");

  expect(lastWatered).toBeInTheDocument();
});
