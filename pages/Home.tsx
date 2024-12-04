import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; 
import useFetch from '../hooks/useFetchRecipe';

const Home: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const { get, del } = useFetch('http://localhost:5000/recipes');
  const [recipes, setRecipes] = useState<any[]>([]);

  const fetchRecipes = async () => {
    const response = await get('/');
    if (response) setRecipes(response.recipes);
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
                onPress={() => navigation.navigate('Form', { recipe: item })}
              />
            </View>
          </View>
        )}
      />
      <Button
        title="Add Recipe"
        onPress={() => navigation.navigate('Form', { recipe: undefined })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  welcome: { fontSize: 24, marginBottom: 16 },
  recipeCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 8 },
  description: { fontSize: 14, color: '#333', marginBottom: 8 },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  delete: { color: 'red', fontWeight: 'bold' },
});

export default Home;
