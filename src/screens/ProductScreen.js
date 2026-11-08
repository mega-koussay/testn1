import { View, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import products from '../data/products';

const ProductScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() =>
              navigation.navigate('Product Details', { productId: item.id })
            }
          >
            <Image source={{ uri: item.image }} style={styles.image} />
          </Pressable>
        )}
        numColumns={2} // Définit toujours 2 colonnes
        key={2} // Clé statique pour éviter les changements dynamiques
        keyExtractor={(item) => item.id} // Chaque élément doit avoir un id unique
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    width: '50%',
    padding: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
});

export default ProductScreen;
