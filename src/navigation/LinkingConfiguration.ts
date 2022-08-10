import { AppEnv, RootStackParamList } from '@/entities';
import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const env: AppEnv =
  process.env.APP_ENV == AppEnv.Prod ? AppEnv.Prod : process.env.APP_ENV == AppEnv.Stag ? AppEnv.Stag : AppEnv.Dev;

const hosts = {
  dev: 'konoyubitomares.page.link',
  staging: 'konoyubitomares.page.link',
  production: 'konoyubitomare.page.link',
};

export const dynamicHost = hosts[env];

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/'), `https://${dynamicHost}`],
  config: {
    screens: {
      Root: {
        screens: {
          Home: 'home',
          Schedule: 'schedule',
          Notice: 'notice',
          Account: 'account',
        },
      },
      Example: 'example',
    },
  },
};

export default linking;
