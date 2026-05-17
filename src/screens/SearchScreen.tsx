import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export const SearchScreen = () => (
  <View>
    <Text>Search Flights</Text>
    <TextInput placeholder="Origin" />
    <TextInput placeholder="Destination" />
    <TextInput placeholder="Departure Date" />
    <TouchableOpacity>
      <Text>Search</Text>
    </TouchableOpacity>
  </View>
);
