import { Flight, SearchQuery } from '../types/flight';
import { FlightRepository } from '../repositories/FlightRepository';
import { ValidationError } from './ValidationError';

export class FlightSearchService {
  constructor(private repository: FlightRepository) {}

  async search(query: SearchQuery): Promise<Flight[]> {
    this.validate(query);
    const flights = await this.repository.search(query);
    return this.sortByPrice(flights);
  }

  private sortByPrice(flights: Flight[]): Flight[] {
    return [...flights].sort((a, b) => a.price - b.price);
  }

  private validate(query: SearchQuery): void {
    const missingFields: string[] = [];

    if (!query.origin) {
      missingFields.push('origin');
    }
    if (!query.destination) {
      missingFields.push('destination');
    }

    if (missingFields.length > 0) {
      throw new ValidationError(
        `Missing required fields: ${missingFields.join(', ')}`,
        missingFields
      );
    }
  }
}
