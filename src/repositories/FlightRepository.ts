import { Flight, SearchQuery } from '../types/flight';

export interface FlightRepository {
  search(query: SearchQuery): Promise<Flight[]>;
}
