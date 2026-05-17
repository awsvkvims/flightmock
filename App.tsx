import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchScreen } from './src/screens/SearchScreen';
import { ResultsScreen } from './src/screens/ResultsScreen';
import { FlightSearchService } from './src/domain/FlightSearchService';
import { MockFlightRepository } from './src/repositories/__mocks__/MockFlightRepository';
import { Flight } from './src/types/flight';

const repository = new MockFlightRepository();
const searchService = new FlightSearchService(repository);

export default function App() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: {
    origin: string;
    destination: string;
    departureDate: string;
  }) => {
    try {
      const results = await searchService.search({
        origin: query.origin,
        destination: query.destination,
        departureDate: new Date(query.departureDate),
        passengers: 1,
        cabinClass: 'economy',
      });
      setFlights(results);
      setHasSearched(true);
    } catch (error) {
      setFlights([]);
      setHasSearched(true);
    }
  };

  return (
    <View style={styles.container}>
      <SearchScreen onSearch={handleSearch} />
      {hasSearched && <ResultsScreen flights={flights} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
});
