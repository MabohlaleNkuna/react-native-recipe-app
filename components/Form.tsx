import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import useFetch from '../hooks/useFetchRecipe';

interface FormData {
  title: string;
  ingredients: string;
  instructions: string;
  category: string;
  preparation: string;
  time: string;
  cookingTime: string;
  servings: string;
  user: string;
}

const Form: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { recipe } = route.params || {};
  const { post, put } = useFetch('http://localhost:5000/recipes');

  const [formData, setFormData] = useState<FormData>({
    title: recipe?.title || '',
    ingredients: recipe?.ingredients || '',
    instructions: recipe?.instructions || '',
    category: recipe?.category || '',
    preparation: recipe?.preparation || '',
    time: recipe?.time || '',
    cookingTime: recipe?.cookingTime || '',
    servings: recipe?.servings || '',
    user: recipe?.user || '',
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (recipe) {
      await put(`/${recipe._id}`, formData);
    } else {
      await post('/', formData);
    }
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(formData).map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field as keyof FormData]} // Type assertion ensures valid key
          onChangeText={(value) => handleInputChange(field as keyof FormData, value)}
        />
      ))}
      <Button title={recipe ? 'Update' : 'Create'} onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
});

export default Form;
