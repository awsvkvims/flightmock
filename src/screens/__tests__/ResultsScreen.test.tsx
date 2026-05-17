import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ResultsScreen } from '../ResultsScreen';
import { Flight } from '../../types/flight';

describe('ResultsScreen', () => {
  const mockFlight: Flight = {
    id: '1',
    origin: {
      code: 'CMH',
      name: 'John Glenn Columbus International',
      city: 'Columbus',
      country: 'US',
    },
    destination: {
      code: 'JFK',
      name: 'John F Kennedy International',
      city: 'New York',
      country: 'US',
    },
    airline: {
      code: 'AA',
      name: 'American Airlines',
    },
    departureTime: new Date('2026-07-01T08:00:00Z'),
    arrivalTime: new Date('2026-07-01T10:30:00Z'),
    durationMinutes: 150,
    price: 299,
    currency: 'USD',
    seatsAvailable: 12,
  };

  it('should render the Available Flights heading', () => {
    render(<ResultsScreen flights={[mockFlight]} />);
    expect(screen.getByText('Available Flights')).toBeTruthy();
  });

  it('should render the flight route', () => {
    render(<ResultsScreen flights={[mockFlight]} />);
    expect(screen.getByText('CMH → JFK')).toBeTruthy();
  });

  it('should render the flight price', () => {
    render(<ResultsScreen flights={[mockFlight]} />);
    expect(screen.getByText('$299')).toBeTruthy();
  });

  it('should render empty state when no flights provided', () => {
    render(<ResultsScreen flights={[]} />);
    expect(screen.getByText('No flights found')).toBeTruthy();
  });
});
