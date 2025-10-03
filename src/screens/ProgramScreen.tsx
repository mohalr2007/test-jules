import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, useColorScheme } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation, useRoute } from '@react-navigation/native';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import { Program } from '../logic/programGenerator';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const ProgramScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();
  const route = useRoute();
  const { program } = route.params as { program: Program };

  return (
    <StyledView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StyledView className="max-w-md mx-auto flex-1 w-full">
        {/* Header */}
        <StyledView className="flex-row items-center p-4">
          <StyledTouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <ArrowLeftIcon className="text-gray-800 dark:text-gray-200" />
          </StyledTouchableOpacity>
          <StyledText className="text-xl font-bold text-gray-900 dark:text-white flex-1 text-center font-display">{program.name}</StyledText>
          <StyledView className="w-10" />
        </StyledView>

        {/* Main Content */}
        <StyledScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <StyledView className="space-y-4">
            {program.workoutDays.map((day, index) => (
              <StyledView key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                <StyledText className="text-lg font-bold text-primary mb-2">{day.dayName}</StyledText>
                {day.exercises.map((exercise, exIndex) => (
                  <StyledView key={exIndex} className="py-1">
                    <StyledText className="text-base text-gray-800 dark:text-gray-200">
                      - {exercise.name}: <StyledText className="font-semibold">{exercise.sets}x{exercise.reps}</StyledText>
                    </StyledText>
                  </StyledView>
                ))}
              </StyledView>
            ))}
          </StyledView>
        </StyledScrollView>
      </StyledView>
    </StyledView>
  );
};

export default ProgramScreen;