import { Flight, SearchQuery } from '../../types/flight';
import { FlightRepository } from '../FlightRepository';

const mockFlights: Flight[] = [
  {
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
  },
  {
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
      code: 'UA',
      name: 'United Airlines',
      isBudget: false,
    },
    departureTime: new Date('2026-07-01T11:00:00Z'),
    arrivalTime: new Date('2026-07-01T13:45:00Z'),
    durationMinutes: 165,
    price: 249,
    currency: 'USD',
    seatsAvailable: 4,
  },
  {
    id: '3',
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
  },
];

export class MockFlightRepository implements FlightRepository {
  async search(query: SearchQuery): Promise<Flight[]> {
    return mockFlights.filter(
      (flight) =>
        flight.origin.code === query.origin && flight.destination.code === query.destination
    );
  }
}
