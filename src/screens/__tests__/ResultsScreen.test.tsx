import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ResultsScreen } from '../ResultsScreen';
import { Flight } from '../../types/flight';
import { featureFlagService } from '../../services/FeatureFlagService';

beforeEach(() => {
  featureFlagService.reset();
});

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
      isBudget: false,
    },
    departureTime: new Date('2026-07-01T08:00:00Z'),
    arrivalTime: new Date('2026-07-01T10:30:00Z'),
    durationMinutes: 150,
    price: 299,
    currency: 'USD',
    seatsAvailable: 12,
  };

  const budgetFlight: Flight = {
    id: '2',
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
      code: 'DL',
      name: 'Delta Airlines',
      isBudget: true,
    },
    departureTime: new Date('2026-07-01T15:30:00Z'),
    arrivalTime: new Date('2026-07-01T18:00:00Z'),
    durationMinutes: 150,
    price: 189,
    currency: 'USD',
    seatsAvailable: 23,
  };

  it('should render the Available Flights heading', () => {
    render(<ResultsScreen flights={[mockFlight]} />);
    expect(screen.getByText('Available Flights')).toBeTruthy();
  });

  it('should render the flight route', () => {
    render(<ResultsScreen flights={[mockFlight]} />);
    expect(screen.getByText('CMH → JFK')).toBeTruthy();
  });

  it('should render the airline name', () => {
    render(<ResultsScreen flights={[mockFlight]} />);
    expect(screen.getByText('American Airlines')).toBeTruthy();
  });

  it('should render the flight price', () => {
    render(<ResultsScreen flights={[mockFlight]} />);
    expect(screen.getByText('$299')).toBeTruthy();
  });

  it('should render empty state when no flights provided', () => {
    render(<ResultsScreen flights={[]} />);
    expect(screen.getByText('No flights found')).toBeTruthy();
  });

  it('should hide budget airlines when showBudgetAirlines flag is disabled', () => {
    render(<ResultsScreen flights={[mockFlight, budgetFlight]} />);
    expect(screen.getByText('$299')).toBeTruthy();
    expect(screen.queryByText('$189')).toBeNull();
  });

  it('should show budget airlines when showBudgetAirlines flag is enabled', () => {
    featureFlagService.enable('showBudgetAirlines');
    render(<ResultsScreen flights={[mockFlight, budgetFlight]} />);
    expect(screen.getByText('$299')).toBeTruthy();
    expect(screen.getByText('$189')).toBeTruthy();
  });
});
