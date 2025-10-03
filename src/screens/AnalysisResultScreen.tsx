import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, useColorScheme } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation, useRoute } from '@react-navigation/native';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const AnalysisResultScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();
  const route = useRoute();
  const { analysisText } = route.params as { analysisText: string };

  // Simple parsing to highlight key metrics
  const formattedText = analysisText.split('\n').map((line, index) => {
    const parts = line.split(':');
    if (parts.length === 2) {
      return (
        <StyledText key={index} className="text-base text-gray-800 dark:text-gray-200 mb-2">
          <StyledText className="font-bold">{parts[0]}:</StyledText>
          {parts[1]}
        </StyledText>
      );
    }
    return <StyledText key={index} className="text-base text-gray-800 dark:text-gray-200">{line}</StyledText>;
  });

  return (
    <StyledView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StyledView className="max-w-md mx-auto flex-1 w-full">
        {/* Header */}
        <StyledView className="flex-row items-center p-4">
          <StyledTouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <ArrowLeftIcon className="text-gray-800 dark:text-gray-200" />
          </StyledTouchableOpacity>
          <StyledText className="text-xl font-bold text-gray-900 dark:text-white flex-1 text-center font-display">Nutritional Analysis</StyledText>
          <StyledView className="w-10" />
        </StyledView>

        {/* Main Content */}
        <StyledScrollView
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
            <StyledView className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
                {formattedText}
            </StyledView>
        </StyledScrollView>
      </StyledView>
    </StyledView>
  );
};

export default AnalysisResultScreen;