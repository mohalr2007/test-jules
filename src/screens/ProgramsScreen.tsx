import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

const ProgramsScreen = () => {
  return (
    <StyledView className="flex-1 justify-center items-center bg-background-light dark:bg-background-dark">
      <StyledText className="text-xl text-gray-900 dark:text-white">Programs Screen</StyledText>
    </StyledView>
  );
};

export default ProgramsScreen;