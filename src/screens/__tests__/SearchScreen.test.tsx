import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { SearchScreen } from '../SearchScreen';

describe('SearchScreen', () => {
  it('should render the search form with all required fields', () => {
    render(<SearchScreen onSearch={jest.fn()} />);

    expect(screen.getByText('Search Flights')).toBeTruthy();
    expect(screen.getByPlaceholderText('Origin')).toBeTruthy();
    expect(screen.getByPlaceholderText('Destination')).toBeTruthy();
    expect(screen.getByPlaceholderText('Departure Date')).toBeTruthy();
    expect(screen.getByText('Search')).toBeTruthy();
  });

  it('should call onSearch with the entered values when Search is tapped', () => {
    const onSearch = jest.fn();
    render(<SearchScreen onSearch={onSearch} />);

    fireEvent.changeText(screen.getByPlaceholderText('Origin'), 'CMH');
    fireEvent.changeText(screen.getByPlaceholderText('Destination'), 'JFK');
    fireEvent.changeText(screen.getByPlaceholderText('Departure Date'), '2026-07-01');
    fireEvent.press(screen.getByText('Search'));

    expect(onSearch).toHaveBeenCalledWith({
      origin: 'CMH',
      destination: 'JFK',
      departureDate: '2026-07-01',
    });
  });
});
