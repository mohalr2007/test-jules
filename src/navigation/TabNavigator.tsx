import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';

import AthleteProfileScreen from '../screens/AthleteProfileScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import SettingsScreen from '../screens/SettingsScreen';

import ProgramsIcon from '../components/icons/ProgramsIcon';
import AthletesIcon from '../components/icons/AthletesIcon';
import NutritionIcon from '../components/icons/NutritionIcon';
import SettingsIcon from '../components/icons/SettingsIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let IconComponent;
          const iconColor = focused ? '#13a4ec' : (isDarkMode ? '#9ca3af' : '#6b7280');

          if (route.name === 'Athletes') {
            IconComponent = AthletesIcon;
          } else if (route.name === 'Programs') {
            IconComponent = ProgramsIcon;
          } else if (route.name === 'NutritionTab') {
            IconComponent = NutritionIcon;
          } else if (route.name === 'Settings') {
            IconComponent = SettingsIcon;
          }

          return IconComponent ? <IconComponent color={iconColor} /> : null;
        },
        tabBarActiveTintColor: '#13a4ec',
        tabBarInactiveTintColor: isDarkMode ? '#9ca3af' : '#6b7280',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#101c22' : '#f6f7f8',
          borderTopColor: isDarkMode ? '#374151' : '#e5e7eb',
        },
      })}
    >
      <Tab.Screen name="Programs" component={ProgramsScreen} />
      <Tab.Screen name="Athletes" component={AthleteProfileScreen} />
      {/* We use a placeholder component for the Nutrition tab to trigger navigation */}
      <Tab.Screen
        name="NutritionTab"
        component={() => null} // No actual screen, just for navigation
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // Prevent default action
            navigation.navigate('Camera'); // Navigate to Camera screen
          },
        })}
        options={{ tabBarLabel: 'Nutrition' }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;