import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

interface SearchScreenProps {
  onSearch: (query: { origin: string; destination: string; departureDate: string }) => void;
}

export const SearchScreen = ({ onSearch }: SearchScreenProps) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  return (
    <View>
      <Text>Search Flights</Text>
      <TextInput placeholder="Origin" value={origin} onChangeText={setOrigin} />
      <TextInput placeholder="Destination" value={destination} onChangeText={setDestination} />
      <TextInput
        placeholder="Departure Date"
        value={departureDate}
        onChangeText={setDepartureDate}
      />
      <TouchableOpacity onPress={() => onSearch({ origin, destination, departureDate })}>
        <Text>Search</Text>
      </TouchableOpacity>
    </View>
  );
};
