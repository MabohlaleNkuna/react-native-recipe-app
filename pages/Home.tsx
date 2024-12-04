import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useFetch from '../hooks/useFetchRecipe';

const Home: React.FC = () => {
  const { get, del, loading, error } = useFetch('http://localhost:5000/recipes');
  const [recipes, setRecipes] = useState<any[]>([]);

  const fetchRecipes = async () => {
    const response = await get('/');
    if (response?.recipes) setRecipes(response.recipes);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchRecipes();
    }, [])
  );

  const deleteRecipe = async (id: string) => {
    await del(`/${id}`);
    fetchRecipes();
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to the Recipe Manager!</Text>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.category}</Text>
            <Text numberOfLines={2} style={styles.description}>
              {item.ingredients}
            </Text>
            <View style={styles.cardActions}>
              <TouchableOpacity onPress={() => deleteRecipe(item._id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
              <Button
                title="Edit"
                onPress={() => console.log('Edit recipe')} // Placeholder
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  welcome: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  recipeCard: { padding: 16, backgroundColor: '#f9f9f9', marginBottom: 8 },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#888' },
  description: { fontSize: 12 },
  cardActions: { flexDirection: 'row', justifyContent: 'space-between' },
  delete: { color: 'red' },
});

export default Home;
