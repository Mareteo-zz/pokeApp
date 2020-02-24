import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import HomeScreen from './Screens/HomeScreen';
import PokemonDetailScreen from './Screens/PokemonDetailScreen';

const Stack = createStackNavigator();

export default App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={PokemonDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}