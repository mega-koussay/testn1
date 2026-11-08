import { FlatList, View, StyleSheet, Text, Pressable } from 'react-native';
import { useSelector } from 'react-redux';

import CartListItem from '../components/CartListItem';
import { selectCartItems, selectCartSubtotal } from '../store/cartSlice';

const ShoppingCartTotals = ({ subtotal }) => (
  <View style={styles.totalsContainer}>
    <View style={styles.row}>
      <Text style={styles.text}>Subtotal</Text>
      <Text style={styles.text}>{subtotal.toFixed(2)} US$</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.text}>Delivery</Text>
      <Text style={styles.text}>10.00 US$</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.textBold}>Total</Text>
      <Text style={styles.textBold}>{(subtotal + 10).toFixed(2)} US$</Text>
    </View>
  </View>
);

const ShoppingCart = () => {
  const cart = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        keyExtractor={(item) => `${item.product.id}-${item.size}`}
        ListFooterComponent={<ShoppingCartTotals subtotal={subtotal} />}
        contentContainerStyle={styles.listContent}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 120,
  },
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: 'gainsboro',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: 'gray',
  },
  textBold: {
    fontSize: 16,
    color: 'gray',
    fontWeight: '500',
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

export default ShoppingCart;
