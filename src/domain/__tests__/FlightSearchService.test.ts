import { FlightSearchService } from '../FlightSearchService';

describe('FlightSearchService', () => {
  it('should be instantiable', () => {
    const service = new FlightSearchService();
    expect(service).toBeDefined();
  });
});
