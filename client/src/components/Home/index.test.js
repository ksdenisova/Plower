import Home from '.';
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react"
import HttpClient from '../../API/HttpClient';
import userEvent from '@testing-library/user-event'

describe('Home', () => {
  beforeEach(() => {
    const plants = [ { "_id": "0", "name": "First test plant", "dateAdded": "2022-03-30T12:01:00", "lastWatered": "2022-03-30T12:01:00", "humidity": "75" },
                      { "_id": "1", "name": "Second test plant",  "dateAdded": "2022-03-18T07:15:00", "lastWatered": "2022-03-18T07:15:00", "humidity": "50" },
                      { "_id": "2", "name": "Third test plant", "dateAdded": "2022-03-28T23:12:10", "lastWatered": "2022-03-28T23:12:10", "humidity": "32" }];
  
      jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(plants)
      })
    );
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders the header on Home page', async () => {
    await act(async () => {
      render(<Home />);
    });
  
    const header = screen.getByText("Plower");
  
    expect(header).toBeInTheDocument();
  });
  
  test('renders the plus button for adding a new plant', async () => {
    await act(async () => {
      render(<Home />);
    });
  
    const button = screen.getByTestId("addButton");
  
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("+");
  });
  
  test('does not render the window for adding a new plant by default', async () => {
    await act(async () => {
      render(<Home />);
    });
  
    const popup = screen.queryByTestId("newPlant");
  
    expect(popup).not.toBeInTheDocument();
  });
  
  test('renders the window for adding a new plant if plus button has been clicked', async() => {
    await act(async () => {
      render(<Home />);
    });
  
    const button = screen.getByTestId("addButton");
    fireEvent.click(button);
  
    const popup = screen.queryByTestId("newPlant");
  
    expect(popup).toBeInTheDocument();
  });
  
 test('adds a new plant to the existing list', async() => {
    const createPlantSpy = jest.spyOn(HttpClient, "createPlant");

    await act(async () => {
        render(<Home />);
    });
  
    const button = screen.getByTestId("addButton");
    fireEvent.click(button);
  
    const name = "Newly plant";
    const fakeDate = new Date("2022-04-07T00:00:00.000Z");
    const dateSpy = jest.spyOn(Date, 'now').mockImplementation(() => fakeDate);

    let newPlant = { "name": name, "sensorId": "", "humidity": "", 
                      "dateAdded": fakeDate, "lastWatered": fakeDate};
    
    const form = screen.getByRole("textbox"); 
    userEvent.type(form, name + '{enter}');
    
    await waitFor(() => {
      expect(createPlantSpy).toHaveBeenCalled();
      expect(createPlantSpy).toHaveBeenCalledWith(newPlant);
    });
  });

  test('renders plants in descending order based on date added', async() => {
    await act(async () => {
      render(<Home />);
    });
  
    const plants = screen.getAllByTestId("plant");
    
    expect(plants).toHaveLength(3);
    expect(plants[0]).toHaveTextContent("First test plant");
    expect(plants[1]).toHaveTextContent("Third test plant");
    expect(plants[2]).toHaveTextContent("Second test plant");
  });

  test('renders the list of plants', async () => {
    const getPlantsSpy = jest.spyOn(HttpClient, "getPlants");
    
    await act(async () => {
      render(<Home />);
    });
  
    const firstPlant = screen.getByText("First test plant");
    const secondPlant = screen.getByText("Second test plant");
    const thirdPlant = screen.getByText("Third test plant");
  
    expect(getPlantsSpy).toHaveBeenCalled();
    expect(firstPlant).toBeInTheDocument();
    expect(secondPlant).toBeInTheDocument();
    expect(thirdPlant).toBeInTheDocument();
  });
});
