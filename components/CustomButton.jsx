import React from 'react';
import { Button, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <Button 
      title={title} 
      onPress={onPress} 
      style={[styles.button, style]} 
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    backgroundColor: '#004AAD',
    padding: 10,
    borderRadius: 5,
  },
});

export default CustomButton;
