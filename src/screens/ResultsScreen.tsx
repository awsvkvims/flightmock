import React from 'react';
import { View, Text } from 'react-native';
import { Flight } from '../types/flight';

function FlightsList({ flights }: { flights: Flight[] }) {
  if (flights.length === 0) {
    return <Text>No flights found</Text>;
  }

  return (
    <View>
      {flights.map((flight) => (
        <View key={flight.id}>
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
  return (
    <View>
      <Text>Available Flights</Text>

      {flights.length === 0 ? <Text>No flights found</Text> : <FlightsList flights={flights} />}
    </View>
  );
};
