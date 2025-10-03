import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert, Platform } from 'react-native';
import { styled } from 'nativewind';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '@env';
import RNFS from 'react-native-fs';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

const CameraScreen = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const fileToGenerativePart = async (path: string, mimeType: string) => {
    const base64 = await RNFS.readFile(path, 'base64');
    return {
      inlineData: {
        data: base64,
        mimeType,
      },
    };
  }

  const handleTakePhoto = async () => {
    if (camera.current == null) {
      Alert.alert("Error", "Camera not available.");
      return;
    }
    setIsLoading(true);
    try {
      const photo = await camera.current.takePhoto({
        qualityPrioritization: 'speed',
        flash: 'off',
        enableShutterSound: false,
      });

      const imagePath = Platform.OS === 'android' ? `file://${photo.path}` : photo.path;
      const imagePart = await fileToGenerativePart(imagePath, 'image/jpeg');

      const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
      const prompt = "Analyze the nutritional value of the meal in this image. Provide an estimate of calories, protein, carbohydrates, and fats. Format the response clearly with each metric on a new line.";

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text();

      navigation.navigate('AnalysisResult', { analysisText: text });

    } catch (e: any) {
      console.error(e);
      Alert.alert("Error", `Failed to analyze image: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasPermission) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-background-dark">
        <StyledText className="text-white text-center mb-4">We need camera permission to analyze meals.</StyledText>
        <StyledTouchableOpacity className="bg-primary p-3 rounded-lg" onPress={requestPermission}>
          <StyledText className="text-white font-bold">Grant Permission</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    );
  }

  if (device == null) {
    return (
      <StyledView className="flex-1 justify-center items-center bg-background-dark">
        <StyledText className="text-white">No camera device found.</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1">
      <Camera
        ref={camera}
        style={{ flex: 1 }}
        device={device}
        isActive={isFocused}
        photo={true}
      />
      <StyledView className="absolute bottom-0 left-0 right-0 p-8 items-center">
        <StyledTouchableOpacity
          className="w-20 h-20 bg-white rounded-full border-4 border-primary justify-center items-center"
          onPress={handleTakePhoto}
          disabled={isLoading}
        >
          {isLoading ? <ActivityIndicator size="large" color="#13a4ec" /> : null}
        </StyledTouchableOpacity>
      </StyledView>
    </StyledView>
  );
};

export default CameraScreen;