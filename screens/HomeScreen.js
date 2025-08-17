import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { items } from '../backend';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ViewGroceryScreen', { item })}
          >
            <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
            <View style={styles.cardBody}>
              <View style={styles.row}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCost}>₹{item.cost}</Text>
              </View>
              <Text style={styles.itemDetail}>Qty: {item.quantity}</Text>
              <Text style={styles.itemDetail}>Expiry: {item.expiry}</Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', // soft background for contrast
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 12,
  },
  card: {
    flex: 0.48,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 4,
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden', // ensures rounded corners apply to image
  },
  itemImage: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemName: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 5,
  },
  itemCost: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2e7d32', // green for prices
  },
  itemDetail: {
    fontSize: 13,
    color: '#777',
    marginTop: 2,
  },
});
