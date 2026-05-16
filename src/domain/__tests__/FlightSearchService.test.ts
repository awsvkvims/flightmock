import { MockFlightRepository } from '../../repositories/__mocks__/MockFlightRepository';
import { FlightRepository } from '../../repositories/FlightRepository';
import { Flight, SearchQuery } from '../../types/flight';
import { FlightSearchService } from '../FlightSearchService';

describe('FlightSearchService', () => {
  // shared mock repository for tests that need one
  const emptyRepository: FlightRepository = {
    search: jest.fn().mockResolvedValue([]),
  };

  const baseQuery: SearchQuery = {
    origin: 'CMH',
    destination: 'JFK',
    departureDate: new Date('2026-07-01'),
    passengers: 1,
    cabinClass: 'economy',
  };

  it('should be instantiable', () => {
    const service = new FlightSearchService(emptyRepository);
    expect(service).toBeDefined();
  });

  it('should return empty array when no flights are available', async () => {
    const service = new FlightSearchService(emptyRepository);

    const query: SearchQuery = baseQuery;

    const result = await service.search(query);
    expect(result).toEqual([]);
  });

  it('should return flights from the repository matching the search query', async () => {
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

    const mockRepository = {
      search: jest.fn().mockResolvedValue([mockFlight]),
    };

    const service = new FlightSearchService(mockRepository);

    const query: SearchQuery = {
      origin: 'CMH',
      destination: 'JFK',
      departureDate: new Date('2026-07-01'),
      passengers: 1,
      cabinClass: 'economy',
    };

    const result = await service.search(query);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('1');
    expect(result[0].price).toBe(299);
    expect(mockRepository.search).toHaveBeenCalledWith(query);
  });

  it('should throw ValidationError if the origin is missing', async () => {
    const service = new FlightSearchService(emptyRepository);

    const query: SearchQuery = { ...baseQuery, origin: '' };

    await expect(service.search(query)).rejects.toThrow('Missing required fields: origin');
  });

  it('should throw ValidationError if the destination is missing', async () => {
    const service = new FlightSearchService(emptyRepository);

    const query: SearchQuery = { ...baseQuery, destination: '' };

    await expect(service.search(query)).rejects.toThrow('Missing required fields: destination');
  });
  it('should throw ValidationError if both origin and destination are missing', async () => {
    const service = new FlightSearchService(emptyRepository);

    const query: SearchQuery = { ...baseQuery, origin: '', destination: '' };

    await expect(service.search(query)).rejects.toThrow(
      'Missing required fields: origin, destination'
    );
  });

  it('should return flights sorted by price ascending', async () => {
    const flightRepository: MockFlightRepository = new MockFlightRepository();
    const service = new FlightSearchService(flightRepository);

    const query: SearchQuery = baseQuery;

    const results = await service.search(query);
    expect(results).toHaveLength(3);
    expect(results[0].price).toBe(189); // cheapest flight first
    expect(results[1].price).toBe(249);
    expect(results[2].price).toBe(299); // most expensive flight last
  });
});
