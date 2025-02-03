import React from 'react';
import { Button, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, style, mode = 'contained' }) => {
  return (
    <Button 
      title={title} 
      onPress={onPress} 
      mode={mode}
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
  buttonHover: {
    backgroundColor: '#00348F',
  },
  buttonActive: {
    backgroundColor: '#002474',
  },
});

export default CustomButton;
