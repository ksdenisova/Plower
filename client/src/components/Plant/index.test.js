import Plant from '.';
import { render, screen } from "@testing-library/react"

describe('Plant', () => {
  let testPlant;

  beforeEach(() => {
    testPlant = { "_id": "0", "name": "Test plant name", "lastWatered": "" };
  });

  test('renders a plant name', () => {
    render(<Plant plant={testPlant}/>);
  
    const plantName = screen.getByText("Test plant name");
  
    expect(plantName).toBeInTheDocument();
  });
  
  test('renders a default plant image', () => {
    render(<Plant plant={testPlant}/>);
  
    const image = screen.getByRole("img");
  
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/default_plant.png");
  });
  
  test('renders last watering date and time', () => {
    testPlant.lastWatered = "2022-03-30T12:01:00";
    
    render(<Plant plant={testPlant}/>);
  
    const lastWatered = screen.getByText("Last watered: March 30, 2022 at 12:01 pm");
  
    expect(lastWatered).toBeInTheDocument();
  });
  
  test("renders 'Not yet watered' if there are not last watering date and time", () => {
    render(<Plant plant={testPlant}/>);
  
    const lastWatered = screen.getByText("Not yet watered");
  
    expect(lastWatered).toBeInTheDocument();
  });

  test('renders delete button icon', () => {
    render(<Plant plant={testPlant}/>);
  
    const icon = screen.getByTestId("DeleteIcon");
  
    expect(icon).toBeInTheDocument();
  });
});
