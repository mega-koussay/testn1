import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import ProductDetailsScreen from './screens/ProductDetailsScreen';
import ProductScreen from './screens/ProductScreen';
import ShoppingCart from './screens/ShoppingCart';
import { selectCartCount } from './store/cartSlice';

const Stack = createNativeStackNavigator();

const CartIcon = () => {
  const navigation = useNavigation();
  const count = useSelector(selectCartCount);

  return (
    <Pressable
      onPress={() => navigation.navigate('Cart')}
      style={styles.cartIcon}
    >
      <FontAwesome5 name="shopping-cart" size={18} color="gray" />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={{ headerRight: () => <CartIcon /> }}
        />
        <Stack.Screen
          name="Product Detail"
          component={ProductDetailsScreen}
          options={{
            presentation: 'fullScreenModal',
            headerRight: () => <CartIcon />,
          }}
        />
        <Stack.Screen name="Cart" component={ShoppingCart} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    paddingRight: 10,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: 2,
    backgroundColor: 'black',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Navigation;
