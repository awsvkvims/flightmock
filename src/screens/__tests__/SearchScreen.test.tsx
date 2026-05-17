import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { SearchScreen } from '../SearchScreen';

describe('SearchScreen', () => {
  it('should render the search form with all required fields', () => {
    render(<SearchScreen />);

    expect(screen.getByText('Search Flights')).toBeTruthy();
    expect(screen.getByPlaceholderText('Origin')).toBeTruthy();
    expect(screen.getByPlaceholderText('Destination')).toBeTruthy();
    expect(screen.getByPlaceholderText('Departure Date')).toBeTruthy();
    expect(screen.getByText('Search')).toBeTruthy();
  });
});
