import { SearchQuery } from '../../types/flights';
import { FlightSearchService } from '../FlightSearchService';

describe('FlightSearchService', () => {
  it('should be instantiable', () => {
    const service = new FlightSearchService();
    expect(service).toBeDefined();
  });

  it('should return empty array when no flights are available', async () => {
    const service = new FlightSearchService();

    const query: SearchQuery = {
      origin: 'CMH',
      destination: 'JFK',
      departureDate: new Date('2026-07-01'),
      passengers: 1,
      cabinClass: 'economy',
    };

    const result = await service.search(query);

    expect(result).toEqual([]);
  });
});
