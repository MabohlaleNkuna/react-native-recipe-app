import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Alert, FlatList, ActivityIndicator } from 'react-native';
import CustomButton from './CustomButton';

const Form = ({ route, navigation }) => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: '',
    preparation: '',
    time: '',
    cookingTime: '',
    servings: '',
  });

  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const categories = ['Breakfast', 'Lunch', 'Dinner'];

  useEffect(() => {
    if (route.params?.recipe) {
      setFormData(route.params.recipe);
      setIsEditing(true);
    }
  }, [route.params?.recipe]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    for (let key in formData) {
      if (typeof formData[key] === 'string' && !formData[key].trim()) {
        Alert.alert('Validation Error', 'All fields are required');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const url = isEditing
        ? `https://mongodb-recipe-app.onrender.com/recipes/${formData._id}`
        : 'https://mongodb-recipe-app.onrender.com/recipes';

      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error submitting form');
      }

      Alert.alert(isEditing ? 'Success' : 'Created', isEditing ? 'Recipe updated successfully' : 'Recipe created successfully');
      navigation.goBack();  // Navigate back to Home page after submission
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
      <CustomButton title={formData.category || 'Select Category'} onPress={() => setShowCategories(!showCategories)} />
      
      {showCategories && (
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <CustomButton title={item} onPress={() => { handleInputChange('category', item); setShowCategories(false); }} />
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
        <CustomButton title={isEditing ? 'Update Recipe' : 'Create Recipe'} onPress={handleSubmit} />
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
});

export default Form;
