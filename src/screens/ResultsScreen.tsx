import React from 'react';
import { View, Text } from 'react-native';
import { Flight } from '../types/flight';
import { featureFlagService } from '../services/FeatureFlagService';

function FlightsList({ flights }: { flights: Flight[] }) {
  if (flights.length === 0) {
    return <Text>No flights found</Text>;
  }

  return (
    <View>
      {flights.map((flight) => (
        <View key={flight.id}>
          <Text>{flight.airline.name}</Text>
          <Text>
            {flight.origin.code} → {flight.destination.code}
          </Text>
          <Text>${flight.price}</Text>
        </View>
      ))}
    </View>
  );
}

export const ResultsScreen = ({ flights }: { flights: Flight[] }) => {
  const visibleFlights = flights.filter(
    (f) => !f.airline.isBudget || featureFlagService.isEnabled('showBudgetAirlines')
  );

  return (
    <View>
      <Text>Available Flights</Text>

      {visibleFlights.length === 0 ? (
        <Text>No flights found</Text>
      ) : (
        <FlightsList flights={visibleFlights} />
      )}
    </View>
  );
};
