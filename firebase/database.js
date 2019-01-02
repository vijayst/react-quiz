import firebase from '@firebase/app';
import '@firebase/database';
import { API_KEY, DB_URL } from 'react-native-dotenv';

const config = {
  apiKey: API_KEY,
  databaseURL: DB_URL
};
const app = firebase.initializeApp(config);
const database = app.database();
export default database;