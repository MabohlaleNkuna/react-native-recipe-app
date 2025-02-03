import React, { useState } from 'react';  
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, FlatList, Dimensions } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const Form = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { recipe } = route.params || {};

  const categories = ['Breakfast', 'Lunch', 'Dinner'];

  const [formData, setFormData] = useState({
    title: recipe?.title || '',
    ingredients: recipe?.ingredients || '',
    instructions: recipe?.instructions || '',
    category: recipe?.category || '',
    preparation: recipe?.preparation || '',
    time: recipe?.time || '',
    cookingTime: recipe?.cookingTime || '',
    servings: recipe?.servings || '',
  });

  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false); // State to toggle category visibility

  const validateForm = () => {
    for (let key in formData) {
      if (!formData[key].trim()) {
        Alert.alert('Validation Error', 'All fields are required');
        return false;
      }
    }
    return true;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const url = recipe
      ? `https://mongodb-recipe-app.onrender.com/recipes/${recipe._id}`
      : 'https://mongodb-recipe-app.onrender.com/recipes';
    const method = recipe ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', recipe ? 'Recipe updated!' : 'Recipe added!');
        navigation.navigate('Home', { refresh: true });
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} placeholder="Title" value={formData.title} onChangeText={(value) => handleInputChange('title', value)} />
      <TextInput style={styles.input} placeholder="Ingredients" value={formData.ingredients} onChangeText={(value) => handleInputChange('ingredients', value)} />
      <TextInput style={styles.input} placeholder="Instructions" value={formData.instructions} onChangeText={(value) => handleInputChange('instructions', value)} />
      
      <Text style={styles.label}>Category</Text>
      <Button onPress={() => setShowCategories(!showCategories)} color="#004AAD">
        {formData.category || 'Select Category'}
      </Button>
      
      {showCategories && (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.radioItem}>
              <Button mode="outlined" onPress={() => { handleInputChange('category', item); setShowCategories(false); }} color="004AAD">
                {item}
              </Button>
            </View>
          )}
        />
      )}
      
      <TextInput style={styles.input} placeholder="Preparation" value={formData.preparation} onChangeText={(value) => handleInputChange('preparation', value)} />
      <TextInput style={styles.input} placeholder="Time (mins)" keyboardType="numeric" value={formData.time} onChangeText={(value) => handleInputChange('time', value)} />
      <TextInput style={styles.input} placeholder="Cooking Time (mins)" keyboardType="numeric" value={formData.cookingTime} onChangeText={(value) => handleInputChange('cookingTime', value)} />
      <TextInput style={styles.input} placeholder="Servings" keyboardType="numeric" value={formData.servings} onChangeText={(value) => handleInputChange('servings', value)} />
      
      {loading ? (
        <ActivityIndicator animating={true} color="#004AAD" />
      ) : (
        <Button mode="contained" onPress={handleSubmit} color="#004AAD">
          {recipe ? 'Update' : 'Create'} Recipe
        </Button>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f8f8f8',
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  radioItem: {
    marginBottom: 10,
    width: '100%',
  },
});

export default Form;
