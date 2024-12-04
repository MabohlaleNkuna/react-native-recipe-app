import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import useUserFetch from '../hooks/UseuserFetch';
import styles from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';  // import AsyncStorage

interface LoginProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { login, error } = useUserFetch();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);

      if (response?.status) {
        // Store the token in AsyncStorage
        const token = response.data.token;  // Assuming the token is in response.data.token
        await AsyncStorage.setItem('userToken', token);

        Alert.alert('Success', 'Logged in successfully');
        navigation.navigate('Home'); // Navigate to Home after successful login
      } else {
        Alert.alert('Error', error || 'Login failed. Please try again.');
      }
    } catch (err) {
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.startButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={{ marginTop: 20 }}>
        <Text style={styles.text}>
          Not registered?{' '}
          <Text 
            style={styles.linkText} 
            onPress={() => navigation.navigate('Register')}
          >
            Click here
          </Text>{' '}
          to create an account.
        </Text>
      </View>
    </View>
  );
};

export default Login;
