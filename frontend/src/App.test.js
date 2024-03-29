import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const placeholder = screen.getByText(/placeholder/i);
  expect(placeholder).toBeInTheDocument();
});
