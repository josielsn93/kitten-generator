import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming, Easing
} from 'react-native-reanimated';

const fetchKittenImage = async (): Promise<string> => {
    try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg,png&category_ids=5');
        if (!response.ok) {
            throw new Error('Erro ao buscar imagem de gatinho');
        }
        const data = await response.json();
        if (data && data.length > 0 && data[0].url) {
            return data[0].url;
        }
        throw new Error('Nenhuma imagem encontrada');
    } catch (error) {
        console.error('Erro ao buscar imagem de gatinho:', error);
        return '';
    }
};
const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));
 
  useEffect(() => {
    if(isLoading){
        rotation.value = withTiming(360, { duration: 3000, easing: Easing.linear });
    } else {
        rotation.value = 0;
    }
  }, [isLoading]);

  return (
    <View style={styles.loadingContainer}>
      <Animated.Image source={require('./assets/images/dog.png')} style={[styles.dogHead, animatedStyle]} />
    </View>
  );
};

const MainContent = (): JSX.Element => {
  const [kitten, setKitten] = useState<string | null>(null);
  const scale = useSharedValue(1);
  const animatedButton = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 50 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  const handlePress = () => {
    scale.value = withTiming(0.8, { duration: 100 }, () => {
        scale.value = withTiming(1, { duration: 100 });
      generatePet();
    });
  };

  const generatePet = (): void => {
        fetchKittenImage().then(url => setKitten(url));
};
  
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.welcomeText}>Gerador de Bichinhos Aleatório</Text>
      {kitten && (
        <Image source={kitten} style={styles.kittenImage} />
       )}
            <Animated.View style={[styles.buttonContainer, animatedButton]}>
                <TouchableOpacity
          style={styles.button}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
        >
          <Text style={styles.buttonText}>Gerar</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const App = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingScreen isLoading={isLoading} /> : <MainContent />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  dogHead: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', backgroundColor: '#1e1e1e',
  },
  welcomeText: {
    fontSize: 24,
    color: '#ffffff',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20, 
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }, 
  buttonText: { 
    color: '#fff', 
    fontSize: 16 
  },
  kittenImage: {
    width: 200, height: 200, marginTop: 20,
  },

});

export default App;
