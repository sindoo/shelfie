import { Client, Account, Avatars, Databases} from 'react-native-appwrite';

export const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('68e5145f00035559b103') // Your Appwrite Project ID
    .setPlatform('com.nobugteam.shelfie'); // Your iOS Bundle ID or Android Package Name

export const account = new Account(client);
export const avatars = new Avatars(client);

export const databases = new Databases(client);