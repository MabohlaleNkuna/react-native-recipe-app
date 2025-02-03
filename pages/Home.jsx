import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://mongodb-recipe-app.onrender.com/recipes');
      const data = await response.json();
      if (data && data.recipes) {
        setRecipes(data.recipes);
      }
    } catch (err) {
      setError('Error fetching recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const deleteRecipe = async (id) => {
    try {
      await fetch(`https://mongodb-recipe-app.onrender.com/recipes/${id}`, {
        method: 'DELETE',
      });
      fetchRecipes();
    } catch (err) {
      setError('Error deleting recipe');
    }
  };

  const handleAddRecipe = () => {
    navigation.navigate('Form');
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the Recipe Manager!</Text>
      <Button title="Add New Recipe" onPress={handleAddRecipe} color="#004AAD" />
      
      {recipes.length > 0 ? (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>Category: {item.category}</Text>
              <Text style={styles.description}>Ingredients: {item.ingredients}</Text>
              <Text style={styles.info}>Instructions: {item.instructions}</Text>
              <Text style={styles.info}>Preparation: {item.preparation}</Text>
              <Text style={styles.info}>Cooking Time: {item.cookingTime} mins</Text>
              <Text style={styles.info}>Total Time: {item.time} mins</Text>
              <Text style={styles.info}>Servings: {item.servings}</Text>

              <View style={styles.cardActions}>
                <TouchableOpacity onPress={() => deleteRecipe(item._id)}>
                  <Text style={styles.delete}>Delete</Text>
                </TouchableOpacity>
                <Button title="Edit" onPress={() => navigation.navigate('Form', { recipe: item })} color="#004AAD" />
              </View>
            </View>
          )}
        />
      ) : (
        <Text>No recipes available.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  welcome: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  recipeCard: { padding: 16, backgroundColor: '#f9f9f9', marginBottom: 8, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#555', marginBottom: 4 },
  description: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  info: { fontSize: 12, color: '#333', marginBottom: 2 },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  delete: { color: 'red', fontWeight: 'bold' },
});

export default Home;
