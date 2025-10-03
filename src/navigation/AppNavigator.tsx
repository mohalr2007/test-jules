import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator'; // Import the new TabNavigator
import ProgramScreen from '../screens/ProgramScreen';
import CameraScreen from '../screens/CameraScreen';
import AnalysisResultScreen from '../screens/AnalysisResultScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* The main screen is now the TabNavigator */}
        <Stack.Screen name="Main" component={TabNavigator} />

        {/* These screens will be pushed on top of the tabs */}
        <Stack.Screen name="Program" component={ProgramScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="AnalysisResult" component={AnalysisResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;