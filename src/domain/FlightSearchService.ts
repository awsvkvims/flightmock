import { Flight, SearchQuery } from '../types/flight';
import { FlightRepository } from '../repositories/FlightRepository';

export class FlightSearchService {
  constructor(private repository: FlightRepository) {}

  async search(query: SearchQuery): Promise<Flight[]> {
    return this.repository.search(query);
  }
}
