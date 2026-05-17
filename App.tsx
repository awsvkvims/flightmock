import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchScreen } from './src/screens/SearchScreen';

export default function App() {
  const [searchMessage, setSearchMessage] = useState('');

  const handleSearch = (query: { origin: string; destination: string; departureDate: string }) => {
    setSearchMessage(
      `Flight search from ${query.origin} → ${query.destination} on ${query.departureDate} will be available soon.`
    );
  };

  return (
    <View style={styles.container}>
      <SearchScreen onSearch={handleSearch} />
      {searchMessage ? <Text>{searchMessage}</Text> : null}
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
