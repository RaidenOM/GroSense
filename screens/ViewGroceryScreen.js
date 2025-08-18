import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
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

  const [editing, setEditing] = useState('');
  const [tempValue, setTempValue] = useState('');

  const [fieldsWidth, setFieldsWidth] = useState(0);

  const startEdit = (field, value) => {
    setEditing(field);
    setTempValue(value);
  };

  const saveEdit = () => {
    if (editing === 'name') setName(tempValue);
    if (editing === 'note') setNote(tempValue);
    if (editing === 'cost') setCost(tempValue);
    if (editing === 'expiry') setExpiry(tempValue);
    setEditing('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Image + Info */}
        <View style={[styles.row]}>
          <View>
            <Image source={{ uri: image }} style={[styles.itemImage]} />
            <View style={styles.imageActions}>
              <TouchableOpacity style={styles.imageButton}>
                <Icon name="image" size={18} color="#4caf50" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.imageButton, { backgroundColor: '#f44336' }]}
              >
                <Icon name="delete" size={18} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.itemInfo]}>
            {/* Name */}
            <View style={styles.editableRow}>
              {editing === 'name' ? (
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={tempValue}
                  onChangeText={setTempValue}
                  autoFocus
                />
              ) : (
                <Text style={styles.itemName}>{name}</Text>
              )}
              <TouchableOpacity
                onPress={() =>
                  editing === 'name' ? saveEdit() : startEdit('name', name)
                }
              >
                <Icon
                  name={editing === 'name' ? 'check-circle' : 'edit'}
                  size={20}
                  color={editing === 'name' ? '#4caf50' : '#888'}
                />
              </TouchableOpacity>
            </View>

            {/* Note */}
            <View style={styles.editableRow}>
              {editing === 'note' ? (
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  value={tempValue}
                  onChangeText={setTempValue}
                  autoFocus
                />
              ) : (
                <Text style={styles.itemNote}>{note || 'No notes'}</Text>
              )}
              <TouchableOpacity
                onPress={() =>
                  editing === 'note' ? saveEdit() : startEdit('note', note)
                }
              >
                <Icon
                  name={editing === 'note' ? 'check-circle' : 'edit'}
                  size={20}
                  color={editing === 'note' ? '#4caf50' : '#888'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Cost */}
        <View style={styles.detailRow}>
          <Text style={styles.label}>Cost</Text>
          <View style={styles.editableRow}>
            <Text>₹</Text>
            {editing === 'cost' ? (
              <TextInput
                style={[styles.input, { minWidth: 100, textAlign: 'center' }]}
                keyboardType="numeric"
                value={tempValue}
                onChangeText={setTempValue}
                autoFocus
              />
            ) : (
              <Text style={styles.value}>{cost}</Text>
            )}
            <TouchableOpacity
              onPress={() =>
                editing === 'cost'
                  ? saveEdit()
                  : startEdit('cost', cost.toString())
              }
            >
              <Icon
                name={editing === 'cost' ? 'check-circle' : 'edit'}
                size={20}
                color={editing === 'cost' ? '#4caf50' : '#888'}
              />
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
            {editing === 'expiry' ? (
              <TextInput
                style={[styles.input, { minWidth: 100, textAlign: 'center' }]}
                value={tempValue}
                onChangeText={setTempValue}
                autoFocus
              />
            ) : (
              <Text style={styles.value}>{expiry}</Text>
            )}
            <TouchableOpacity
              onPress={() =>
                editing === 'expiry' ? saveEdit() : startEdit('expiry', expiry)
              }
            >
              <Icon
                name={editing === 'expiry' ? 'check-circle' : 'calendar-month'}
                size={20}
                color={editing === 'expiry' ? '#4caf50' : '#888'}
              />
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
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
  },
  imageActions: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 8,
    justifyContent: 'space-between',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  imageButtonText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#4caf50',
  },
  itemInfo: { flex: 1, marginLeft: 20 },
  editableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  itemName: { fontWeight: 'bold', fontSize: 22, color: '#333' },
  itemNote: { fontSize: 14, color: '#777' },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: { fontSize: 16, fontWeight: '600', color: '#555' },
  value: { fontSize: 16, color: '#333' },
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
    minWidth: 40,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 2,
  },
});
