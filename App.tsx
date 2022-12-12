import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import RootStack from './src/navigation/RootStack';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Warning: Async Storage has been extracted from react-native core'
]);

export default function App() {
  return <RootStack />
}
