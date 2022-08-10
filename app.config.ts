enum AppEnv {
  Prod = 'production',
  Stag = 'staging',
  Dev = 'dev',
}

const version = '1.0.0';
const buildNumber = 1;

const env: AppEnv =
  process.env.APP_ENV == AppEnv.Prod ? AppEnv.Prod : process.env.APP_ENV == AppEnv.Stag ? AppEnv.Stag : AppEnv.Dev;

module.exports = () => ({
  ...defaultConfig,
  expo: {
    ...defaultConfig.expo,
    name: Configs[env].name,
    slug: Configs[env].slug,
    scheme: Configs[env].scheme,
    ios: {
      ...defaultConfig.expo.ios,
      associatedDomains: Configs[env].ios.associatedDomains,
      // googleServicesFile: Configs[env].ios.googleServicesFile,
      config: { ...defaultConfig.expo.ios.config, googleMapsApiKey: Configs[env].ios.config.googleMapsApiKey },
    },
    android: {
      ...defaultConfig.expo.android,
      intentFilters: Configs[env].android.intentFilters,
      // googleServicesFile: Configs[env].android.googleServicesFile,
      config: {
        ...defaultConfig.expo.android.config,
        googleMaps: { apiKey: Configs[env].android.config.googleMaps.apiKey },
      },
    },
    web: {
      ...defaultConfig.expo.web,
      config: {
        firebase: Configs[env].web.config.firebase,
        sentry: Configs[env].web.config.sentry,
      },
    },
    extra: {
      ...defaultConfig.expo.extra,
      eas: {
        projectId: Configs[env].extra.eas.projectId,
      },
    },
    hooks: defaultConfig.expo.hooks,
  },
});

const defaultConfig = {
  name: 'RN-Template',
  displayName: 'RN-Template',
  expo: {
    version: version,
    orientation: 'portrait',
    icon: './src/assets/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './src/assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#FFA37F',
    },
    updates: {
      enabled: true,
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    jsEngine: 'hermes',
    notification: {
      icon: './src/assets/icon.png',
      color: '#7B84A5',
      iosDisplayInForeground: true,
      androidMode: 'collapse',
      androidCollapsedTitle: '新着通知が届いています',
    },
    ios: {
      bundleIdentifier: 'com.app.template',
      buildNumber: String(buildNumber),
      supportsTablet: true,
      appStoreUrl: 'https://apps.apple.com/jp/app/template/id0000000000',
      config: {
        googleMobileAdsAppId: '',
      },
      infoPlist: {
        CFBundleDevelopmentRegion: 'ja_JP',
        NSLocationWhenInUseUsageDescription: 'マップに反映するため位置情報を利用することがあります',
        NSUserTrackingUsageDescription:
          '個人の特定につながることはありません。興味関心に合わせた広告配信のために使用します。',
        UIBackgroundModes: ['remote-notification'],
      },
    },
    android: {
      package: 'com.app.template',
      versionCode: buildNumber,
      adaptiveIcon: {
        foregroundImage: './src/assets/android-foregroundImage.png',
        backgroundImage: './src/assets/android-backgraoundImage.png',
      },
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.app.template',
      config: {
        googleMobileAdsAppId: '',
      },
      permissions: ['INTERNET', 'VIBRATE', 'ACCESS_NOTIFICATION_POLICY'],
    },
    web: {
      favicon: './src/assets/favicon.png',
      config: {},
    },
    extra: { eas: {} },
    plugins: [
      ['expo-notifications', { icon: './src/assets/icon.png', color: '#7B84A5' }],
      [
        'expo-ads-admob',
        {
          userTrackingPermission:
            '個人の特定につながることはありません。興味関心に合わせた広告配信のために使用します。',
        },
      ],
      ['react-native-compressor'],
      ['sentry-expo'],
    ],
    hooks: {
      postPublish: [
        {
          file: 'sentry-expo/upload-sourcemaps',
          config: {
            organization: 'xxx',
            project: 'xxx',
            authToken: '',
          },
        },
      ],
    },
  },
};

const Configs = {
  dev: {
    name: 'RN-Template-dev',
    slug: 'RN-Template-dev',
    scheme: 'template',
    ios: {
      associatedDomains: ['applinks:template.page.link'],
      // googleServicesFile: './GoogleService-Info.dev.plist',
      config: { googleMapsApiKey: '' },
    },
    android: {
      // googleServicesFile: './google-services.dev.json',
      config: { googleMaps: { apiKey: '' } },
      intentFilters: [
        {
          action: 'VIEW',
          data: [{ scheme: 'https', host: 'template.page.link', pathPrefix: '/records' }],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    web: {
      config: {
        firebase: {
          apiKey: '',
          authDomain: '',
          projectId: '',
          storageBucket: '',
          messagingSenderId: '',
          appId: '',
          measurementId: '',
        },
        sentry: {
          // dsn: 'https://xxx',
          environment: 'develop',
        },
      },
    },
    extra: {
      eas: { projectId: 'xxx' },
    },
  },
  staging: {
    name: 'RN-Template-stg',
    slug: 'RN-Template',
    scheme: 'template',
    ios: {
      associatedDomains: ['applinks:template.page.link'],
      // googleServicesFile: './GoogleService-Info.stg.plist',
      config: { googleMapsApiKey: '' },
    },
    android: {
      // googleServicesFile: './google-services.stg.json',
      config: { googleMaps: { apiKey: '' } },
      intentFilters: [
        {
          action: 'VIEW',
          data: [{ scheme: 'https', host: 'template.page.link', pathPrefix: '/records' }],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    web: {
      config: {
        firebase: {
          apiKey: '',
          authDomain: '',
          projectId: '',
          storageBucket: '',
          messagingSenderId: '',
          appId: '',
          measurementId: '',
        },
        sentry: {
          // dsn: 'https://xxxx',
          environment: 'staging',
        },
      },
    },
    extra: {
      eas: { projectId: '' },
    },
  },
  production: {
    name: 'RN-Template',
    slug: 'RN-Template',
    scheme: 'template',
    ios: {
      associatedDomains: ['applinks:xxx.page.link'],
      // googleServicesFile: './GoogleService-Info.prod.plist',
      config: { googleMapsApiKey: '' },
    },
    android: {
      // googleServicesFile: './google-services.prod.json',
      config: { googleMaps: { apiKey: '' } },
      intentFilters: [
        {
          action: 'VIEW',
          data: [{ scheme: 'https', host: 'xxx.page.link', pathPrefix: '/records' }],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
    },
    web: {
      config: {
        firebase: {
          apiKey: '',
          authDomain: '',
          projectId: '',
          storageBucket: '',
          messagingSenderId: '',
          appId: '',
          measurementId: '',
        },
        sentry: {
          // dsn: 'https://xxx',
          environment: 'production',
        },
      },
    },
    extra: {
      eas: { projectId: '' },
    },
  },
};
