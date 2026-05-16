import { SearchQuery } from '../../types/flight';
import { MockFlightRepository } from '../__mocks__/MockFlightRepository';

describe('MockFlightRepository', () => {
  it('should return flights matching origin and destination', async () => {
    const repository = new MockFlightRepository();
    const query: SearchQuery = {
      origin: 'CMH',
      destination: 'JFK',
    };

    const results = await repository.search(query);
    expect(results).toHaveLength(3);
    expect(results[0].origin.code).toBe('CMH');
    expect(results[0].destination.code).toBe('JFK');
  });

  it('should return an empty array if no flights match', async () => {
    const repository = new MockFlightRepository();
    const query: SearchQuery = {
      origin: 'LAX',
      destination: 'ORD',
    };

    const results = await repository.search(query);
    expect(results).toHaveLength(0);
  });
});
