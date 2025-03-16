import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TestTemperament from './components/TestTemperament';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TestTemperament />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
