import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import CustomButton from '../components/CustomButton';
import { MaterialIcons } from '@expo/vector-icons';

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

  // Call fetchRecipes when Home is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchRecipes();
    }, [])
  );

  const deleteRecipe = async (id) => {
    try {
      await fetch(`https://mongodb-recipe-app.onrender.com/recipes/${id}`, {
        method: 'DELETE',
      });
      fetchRecipes();  // Fetch recipes again after deletion to update the list
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
      
      <ScrollView style={styles.recipeList}>
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
                  <CustomButton 
                    title="Edit" 
                    onPress={() => navigation.navigate('Form', { recipe: item })} 
                    style={styles.editButton} 
                  />
                </View>
              </View>
            )}
          />
        ) : (
          <Text>No recipes available.</Text>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddRecipe}
        activeOpacity={0.7}
      >
        <MaterialIcons name="add-circle" size={60} color="#004AAD" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#F4F4F9' 
  },
  welcome: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center',
    color: '#004AAD' 
  },
  recipeList: { 
    flex: 1 
  },
  recipeCard: { 
    padding: 16, 
    backgroundColor: '#fff', 
    marginBottom: 8, 
    borderRadius: 8,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2 
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 4, 
    color: '#241D10' 
  },
  subtitle: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 4 
  },
  description: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 4 
  },
  info: { 
    fontSize: 12, 
    color: '#333', 
    marginBottom: 2 
  },
  cardActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 8 
  },
  delete: { 
    color: 'red', 
    fontWeight: 'bold' 
  },
  addButton: { 
    position: 'absolute', 
    bottom: 30, 
    right: 30, 
    backgroundColor: 'white', 
    borderRadius: 50, 
    padding: 10, 
    elevation: 5, 
    justifyContent: 'center', 
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#004AAD',
  },
  editButton: { 
    marginLeft: 10, 
    backgroundColor: '#F4C561', 
    paddingVertical: 6, 
    paddingHorizontal: 12, 
    borderRadius: 8 
  },
});

export default Home;
