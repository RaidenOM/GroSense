import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import NotificationScreen from './screens/NotificationScreen';
import RecipeScreen from './screens/RecipeScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import AddGroceryScreen from './screens/AddGroceryScreen';
import ViewGroceryScreen from './screens/ViewGroceryScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen component={HomeScreen} name="HomeScreen" />
      <Tab.Screen component={NotificationScreen} name="NotificationScreen" />
      <Tab.Screen component={RecipeScreen} name="RecipeScreen" />
      <Tab.Screen component={ShoppingListScreen} name="ShoppingListScreen" />
    </Tab.Navigator>
  );
}

function MainAppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={HomeTabs}
        name="HomeTabs"
        options={{ headerTitle: 'GroSense' }}
      />
      <Stack.Screen component={AddGroceryScreen} name="AddGroceryScreen" />
      <Stack.Screen component={ViewGroceryScreen} name="ViewGroceryScreen" />
    </Stack.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainAppStack />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
