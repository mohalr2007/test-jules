import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, useColorScheme, Alert } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';
import ProgramsIcon from '../components/icons/ProgramsIcon';
import AthletesIcon from '../components/icons/AthletesIcon';
import NutritionIcon from '../components/icons/NutritionIcon';
import SettingsIcon from '../components/icons/SettingsIcon';
import { generateProgram } from '../logic/programGenerator';
import CustomSelectModal from '../components/CustomSelectModal';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

const selectOptions = {
  gender: ['Male', 'Female', 'Other'],
  goal: ['Muscle Gain', 'Fat Loss', 'Maintenance'],
  level: ['Beginner', 'Intermediate', 'Advanced'],
  availability: ['3 days/week', '4 days/week', '5 days/week'],
  equipment: ['Full Gym', 'Dumbbells Only', 'Bodyweight'],
};

const AthleteProfileScreen = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const navigation = useNavigation();

  // Form State
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState('Male');
  const [weight, setWeight] = useState('70');
  const [goal, setGoal] = useState('Muscle Gain');
  const [level, setLevel] = useState('Beginner');
  const [availability, setAvailability] = useState('3 days/week');
  const [equipment, setEquipment] = useState('Full Gym');
  const [injuries, setInjuries] = useState('');

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSelect, setCurrentSelect] = useState<{ title: string; options: string[]; onSelect: (value: string) => void; } | null>(null);

  const openModal = (key: keyof typeof selectOptions, onSelect: (value: string) => void) => {
    setCurrentSelect({ title: `Select ${key.charAt(0).toUpperCase() + key.slice(1)}`, options: selectOptions[key], onSelect });
    setModalVisible(true);
  };

  const handleGenerateProgram = () => {
    const frequency = parseInt(availability.split(' ')[0], 10);
    if (isNaN(frequency) || !goal || !level) {
        Alert.alert("Invalid Input", "Please ensure all fields are filled correctly.");
        return;
    }
    const program = generateProgram(goal, level, frequency);
    navigation.navigate('Program', { program });
  };

  const CustomSelect = ({ label, value, onOpen }: { label: string; value: string; onOpen: () => void }) => (
    <StyledView>
      <StyledText className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</StyledText>
      <StyledTouchableOpacity onPress={onOpen} className="mt-1 relative">
        <StyledText className="w-full p-3 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white h-12 pt-3">{value}</StyledText>
        <StyledView className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
          <Text className="text-primary">▼</Text>
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  );

  return (
    <StyledView className="flex-1 bg-background-light dark:bg-background-dark">
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <StyledView className="max-w-md mx-auto flex-1 w-full">
        {/* Header */}
        <StyledView className="flex-row items-center p-4">
          <StyledTouchableOpacity className="p-2">
            <ArrowLeftIcon className="text-gray-800 dark:text-gray-200" />
          </StyledTouchableOpacity>
          <StyledText className="text-xl font-bold text-gray-900 dark:text-white flex-1 text-center font-display">Athlete Profile</StyledText>
          <StyledView className="w-10" />
        </StyledView>

        {/* Main Content */}
        <StyledScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false}>
          <StyledView className="space-y-4">
            <StyledView className="flex-row gap-4">
               <StyledView className="flex-1">
                 <StyledText className="text-sm font-medium text-gray-700 dark:text-gray-300">Age</StyledText>
                 <StyledTextInput value={age} onChangeText={setAge} className="mt-1 w-full p-3 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white" placeholder="25" keyboardType="number-pad" />
               </StyledView>
               <StyledView className="flex-1">
                 <CustomSelect label="Gender" value={gender} onOpen={() => openModal('gender', setGender)} />
               </StyledView>
            </StyledView>
            <StyledView>
              <StyledText className="text-sm font-medium text-gray-700 dark:text-gray-300">Weight (kg)</StyledText>
              <StyledTextInput value={weight} onChangeText={setWeight} className="mt-1 w-full p-3 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white" placeholder="70" keyboardType="number-pad" />
            </StyledView>
            <CustomSelect label="Goal" value={goal} onOpen={() => openModal('goal', setGoal)} />
            <CustomSelect label="Level" value={level} onOpen={() => openModal('level', setLevel)} />
            <CustomSelect label="Availability" value={availability} onOpen={() => openModal('availability', setAvailability)} />
            <CustomSelect label="Equipment" value={equipment} onOpen={() => openModal('equipment', setEquipment)} />
            <StyledView>
              <StyledText className="text-sm font-medium text-gray-700 dark:text-gray-300">Injuries</StyledText>
              <StyledTextInput value={injuries} onChangeText={setInjuries} className="mt-1 w-full p-3 bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white" placeholder="e.g., knee pain" />
            </StyledView>
            <StyledView className="pt-6">
              <StyledTouchableOpacity onPress={handleGenerateProgram} className="w-full bg-primary py-4 px-4 rounded-xl shadow-lg">
                <StyledText className="text-white font-bold text-center">Generate Program</StyledText>
              </StyledTouchableOpacity>
            </StyledView>
          </StyledView>
        </StyledScrollView>

        {/* Footer Navigation */}
        <StyledView className="border-t border-gray-200 dark:border-gray-700">
          <StyledView className="flex-row justify-around items-center p-2">
            <StyledTouchableOpacity className="flex flex-col items-center p-2">
              <ProgramsIcon className="text-gray-500 dark:text-gray-400" />
              <StyledText className="text-xs font-medium text-gray-500 dark:text-gray-400">Programs</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="flex flex-col items-center p-2 bg-primary/10 dark:bg-primary/20 rounded-full">
              <AthletesIcon className="text-primary" />
              <StyledText className="text-xs font-bold text-primary">Athletes</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="flex flex-col items-center p-2" onPress={() => navigation.navigate('Camera')}>
              <NutritionIcon className="text-gray-500 dark:text-gray-400" />
              <StyledText className="text-xs font-medium text-gray-500 dark:text-gray-400">Nutrition</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity className="flex flex-col items-center p-2">
              <SettingsIcon className="text-gray-500 dark:text-gray-400" />
              <StyledText className="text-xs font-medium text-gray-500 dark:text-gray-400">Settings</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
      {currentSelect && (
        <CustomSelectModal
          visible={modalVisible}
          title={currentSelect.title}
          options={currentSelect.options}
          onSelect={currentSelect.onSelect}
          onClose={() => setModalVisible(false)}
        />
      )}
    </StyledView>
  );
};

export default AthleteProfileScreen;