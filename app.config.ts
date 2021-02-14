export default {
  expo: {
    name: 'yarukimemo',
    slug: 'yarukimemo',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'cover',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: false,
      bundleIdentifier: 'com.kazu.yarukimemo',
      buildNumber: '1.0.0',
    },
    android: {
      package: 'com.kazu.yarukimemo',
      versionCode: 1,
      permissions: [],
      adaptiveIcon: {
        foregroundImage: './assets/AdaptiveIconForeground.png',
        backgroundImage: './assets/AdaptiveIconBackGround.png',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      firebas: {
        REACT_APP_FIREBASE_API_KE: 'AIzaSyAj5vGXOEtNFszV826Vakrm-gop1Fo6bu8',
        REACT_APP_FIREBASE_AUTH_DOMAI: 'my-first-app-307f9.firebaseapp.com',
        REACT_APP_FIREBASE_PROJECT_I: 'my-first-app-307f9',
        REACT_APP_FIREBASE_STORAGE_BUCKE: 'my-first-app-307f9.appspot.com',
        REACT_APP_FIREBASE_MESSAGING_SENDER_I: '337950002823',
        REACT_APP_FIREBASE_APP_I: '33795000282we:eed9280e4386075e683222',
      },
    },
  },
};
