import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { ThemedView } from '../../components/ThemedView'; 


const HomeScreen = () => {
  return (
    <ThemedView style={styles.mainContainer}>
        <Text style={styles.welcomeText}>bem-vindo</Text>
    </ThemedView>
  );
};

export default function TabOneScreen() {

 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? <LoadingScreen /> : <HomeScreen />}

    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  dogHead: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#000',
    animation: 'rotate 2s linear infinite',
  },
  '@keyframes rotate': {
    from: {
      transform: [{ rotate: '0deg' }],
    },
    to: {
      transform: [{ rotate: '360deg' }],
    },
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#333',
  },
});