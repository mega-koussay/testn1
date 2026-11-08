import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

import products from '../data/products';
import { addToCart } from '../store/cartSlice';

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const product =
    products.find((item) => item.id === route.params?.productId) ?? products[0];

  const { width } = useWindowDimensions();
  const [size, setSize] = useState(product.sizes[0]);

  const images = product.images.filter(Boolean);
  const slides = images.length ? images : [product.image];

  const addToCartHandler = () => {
    dispatch(addToCart({ product, size }));
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={slides}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={{ width, aspectRatio: 1 }} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />

        <View style={styles.content}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.sizes}>
            {product.sizes.map((productSize) => (
              <Pressable
                key={productSize}
                onPress={() => setSize(productSize)}
                style={[styles.size, productSize === size && styles.selectedSize]}
              >
                <Text
                  style={[
                    styles.sizeText,
                    productSize === size && styles.selectedSizeText,
                  ]}
                >
                  {productSize}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      <Pressable onPress={addToCartHandler} style={styles.button}>
        <Text style={styles.buttonText}>Add to cart</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  price: {
    fontWeight: '500',
    fontSize: 16,
    letterSpacing: 1.5,
  },
  description: {
    marginVertical: 10,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
  },
  sizes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  size: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: 'gainsboro',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSize: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  sizeText: {
    fontWeight: '500',
  },
  selectedSizeText: {
    color: 'white',
  },
  button: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 30,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ProductDetailsScreen;
