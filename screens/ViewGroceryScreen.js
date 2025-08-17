import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ViewGroceryScreen() {
  const route = useRoute();
  const { item } = route.params;

  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [note, setNote] = useState(item.note);
  const [cost, setCost] = useState(item.cost);
  const [expiry, setExpiry] = useState(item.expiry);
  const [image, setImage] = useState(item.imageUri);

  const handleEdit = field => {
    console.log(`Edit ${field} tapped`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Image & Name */}
        <View style={styles.row}>
          <View>
            <Image source={{ uri: image }} style={styles.itemImage} />
            <Button title="Pick Image" />
          </View>
          <View style={styles.itemInfo}>
            <View style={styles.editableRow}>
              <Text style={styles.itemName}>{name}</Text>
              <TouchableOpacity onPress={() => handleEdit('name')}>
                <Icon name="edit" size={20} color="#888" />
              </TouchableOpacity>
            </View>
            <View style={styles.editableRow}>
              <Text style={styles.itemNote}>{note}</Text>
              <TouchableOpacity onPress={() => handleEdit('note')}>
                <Icon name="edit" size={20} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Cost */}
        <View style={styles.detailRow}>
          <Text style={styles.label}>Cost</Text>
          <View style={styles.editableRow}>
            <Text style={styles.value}>₹{item.cost}</Text>
            <TouchableOpacity onPress={() => handleEdit('cost')}>
              <Icon name="edit" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.detailRow}>
          <Text style={styles.label}>Quantity</Text>
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => setQuantity(prev => Math.max(0, prev - 1))}
            >
              <Icon name="remove" size={20} color="#fff" />
            </TouchableOpacity>

            <TextInput
              style={styles.qtyValue}
              value={quantity.toString()}
              keyboardType="numeric"
              onChangeText={text => {
                const num = parseInt(text, 10);
                setQuantity(isNaN(num) ? 0 : num);
              }}
            />

            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => setQuantity(prev => prev + 1)}
            >
              <Icon name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Expiry */}
        <View style={styles.detailRow}>
          <Text style={styles.label}>Expiry</Text>
          <View style={styles.editableRow}>
            <Text style={styles.value}>{item.expiry}</Text>
            <TouchableOpacity onPress={() => handleEdit('expiry')}>
              <Icon name="edit" size={20} color="#888" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f4', padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    elevation: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 20,
  },
  editableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#333',
  },
  itemNote: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#bdbdbdff',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 6,
  },
  qtyButton: {
    backgroundColor: '#4caf50',
    padding: 6,
    borderRadius: 6,
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10,
    minWidth: 30,
    textAlign: 'center',
  },
});
