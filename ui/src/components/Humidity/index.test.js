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

  const humidityLevel = screen.getByText("80%");

  expect(humidityLevel).toBeInTheDocument();
});
