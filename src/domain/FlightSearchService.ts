import { SearchQuery, Flight } from '../types/flights';

export class FlightSearchService {
  async search(_query: SearchQuery): Promise<Flight[]> {
    return [];
  }
}
