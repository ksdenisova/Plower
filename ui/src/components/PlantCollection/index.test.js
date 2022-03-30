import PlantCollection from '.';
import { render, screen } from "@testing-library/react"

test('renders an one plant', () => {
  const testPlants = [ { "id": "0", "name": "My first test plant" } ];
  
  render(<PlantCollection plants={testPlants}/>);

  const plant = screen.getByText("My first test plant");

  expect(plant).toBeInTheDocument();
});

test('renders the list of plants', () => {
  const testPlants = [ { "id": "0", "name": "My first test plant" },
                        { "id": "1", "name": "My second test plant" } ];
  
  render(<PlantCollection plants={testPlants}/>);

  const firstPlant = screen.getByText("My first test plant");
  const secondPlant = screen.getByText("My second test plant");

  expect(firstPlant).toBeInTheDocument();
  expect(secondPlant).toBeInTheDocument();
});
