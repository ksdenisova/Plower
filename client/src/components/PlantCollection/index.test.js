import PlantCollection from '.';
import { render, screen } from "@testing-library/react"

describe('PlantCollection', () => {
  test('does not render plants if there are not any plants', () => {
    const testPlants = [];
    
    const { container } = render(<PlantCollection plants={testPlants}/>);
  
    expect(container.firstChild).toBeEmptyDOMElement();
  });
  
  test('renders an one plant', () => {
    const testPlants = [ { "_id": "0", "name": "My first test plant" } ];
    
    render(<PlantCollection plants={testPlants}/>);
  
    const plant = screen.getByText("My first test plant");
  
    expect(plant).toBeInTheDocument();
  });
  
  test('renders the list of plants', () => {
    const testPlants = [ { "_id": "0", "name": "My first test plant" },
                          { "_id": "1", "name": "My second test plant" } ];
    
    render(<PlantCollection plants={testPlants}/>);
  
    const firstPlant = screen.getByText("My first test plant");
    const secondPlant = screen.getByText("My second test plant");
  
    expect(firstPlant).toBeInTheDocument();
    expect(secondPlant).toBeInTheDocument();
  });
  
  test('renders the list of plants with the same names', () => {
    const testPlants = [ { "_id": "0", "name": "Test plant" },
                          { "_id": "1", "name": "Test plant" } ];
    
    render(<PlantCollection plants={testPlants}/>);
  
    const plants = screen.getAllByText("Test plant");
  
    expect(plants).toHaveLength(2);
  });
});
