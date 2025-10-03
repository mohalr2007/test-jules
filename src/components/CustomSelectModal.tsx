import React from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface CustomSelectModalProps {
  visible: boolean;
  title: string;
  options: string[];
  onSelect: (value: string) => void;
  onClose: () => void;
}

const CustomSelectModal = ({ visible, title, options, onSelect, onClose }: CustomSelectModalProps) => {
  const handleSelect = (option: string) => {
    onSelect(option);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 justify-end bg-black/50">
        <SafeAreaView className="bg-background-light dark:bg-background-dark rounded-t-xl">
          <StyledView className="p-4 border-b border-gray-200 dark:border-gray-700">
            <StyledText className="text-lg font-bold text-center text-gray-900 dark:text-white">{title}</StyledText>
          </StyledView>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <StyledTouchableOpacity
                onPress={() => handleSelect(item)}
                className="p-4 border-b border-gray-200 dark:border-gray-700"
              >
                <StyledText className="text-center text-lg text-primary">{item}</StyledText>
              </StyledTouchableOpacity>
            )}
          />
          <StyledTouchableOpacity
            onPress={onClose}
            className="p-4 mt-4"
          >
            <StyledText className="text-center text-lg text-red-500">Cancel</StyledText>
          </StyledTouchableOpacity>
        </SafeAreaView>
      </StyledView>
    </Modal>
  );
};

export default CustomSelectModal;