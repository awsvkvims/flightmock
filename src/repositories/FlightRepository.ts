import { Flight, SearchQuery } from '../types/flights';

export interface FlightRepository {
  search(query: SearchQuery): Promise<Flight[]>;
}
