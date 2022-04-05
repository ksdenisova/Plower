import Humidity from '.';
import { render, screen } from "@testing-library/react"

test('renders humidity progress bar', () => {
  const testHumidity = 75;

  const { container } = render(<Humidity moisture={testHumidity}/>);

  const humidityBar = container.querySelector(`[data-test-id="CircularProgressbarWithChildren"]`);

  expect(humidityBar).toBeInTheDocument();
});

test('renders humidity value in %', () => {
  const testHumidity = 80;

  render(<Humidity moisture={testHumidity}/>);

  const humidityValue = screen.getByText("80%");

  expect(humidityValue).toBeInTheDocument();
});

test('does not render humidity value if plant has not watered yet', () => {
  const testHumidity = "";

  render(<Humidity moisture={testHumidity}/>);

  const humidityValue = screen.queryByTestId("humidityValue");

  expect(humidityValue).not.toBeInTheDocument();
});

test('does not render humidity if it is undefined', () => {
 render(<Humidity />);

  const humidityValue = screen.queryByTestId("humidityValue");

  expect(humidityValue).not.toBeInTheDocument();
});
