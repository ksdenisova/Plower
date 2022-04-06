import NewPlant from '.';
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

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

test('a new plant form has a focus', () => {
  render(<NewPlant />);

  const form = screen.getByRole("textbox");

  expect(form).toHaveFocus();
});

it("calls 'createPlant' function with a new plant name when user clicks the plus button", async () => {
  const createPlantMock = jest.fn();
  
  render(<NewPlant createPlant={createPlantMock} />);

  const form = screen.getByRole("textbox");
  const plantName = "New Test Plant";

  userEvent.type(form, plantName)

  await waitFor(() => {
    expect(form.value).toBe(plantName);
  });

  const button = screen.getByTestId("saveButton");
  userEvent.click(button);

  expect(createPlantMock).toHaveBeenCalledWith(plantName);
});

it("does not call 'createPlant' function when user clicks the plus button and name is empty", async () => {
  const createPlantMock = jest.fn();
  
  render(<NewPlant createPlant={createPlantMock} />);

  const button = screen.getByTestId("saveButton");
  userEvent.click(button);

  expect(createPlantMock).not.toHaveBeenCalled();
});

it("calls 'createPlant' function with a new plant name when user press Enter", async () => {
  const createPlantMock = jest.fn();
  
  render(<NewPlant createPlant={createPlantMock} />);

  const form = screen.getByRole("textbox");
  const plantName = "New Test Plant";

  userEvent.type(form, plantName + '{enter}');

  await waitFor(() => {
    expect(form.value).toBe(plantName);
    expect(createPlantMock).toHaveBeenCalledWith(plantName);
  });
});

it("does not call 'createPlant' function when user presses Enter and name is empty", async () => {
  const createPlantMock = jest.fn();
  
  render(<NewPlant createPlant={createPlantMock} />);

  const form = screen.getByRole("textbox");

  fireEvent.keyPress(form, {key: 'Enter', code: 'Enter', charCode: 13});

  expect(createPlantMock).not.toHaveBeenCalled();
});
